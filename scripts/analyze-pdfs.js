#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const pdfParse = require('pdf-parse');

const PDF_DIR = '/mnt/c/Users/brand/Downloads/ilovepdf_split';
const OUTPUT_FILE = path.join(__dirname, '../docs/content-index.json');

/**
 * Extract text from a PDF file
 */
async function extractPdfText(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    return {
      text: data.text,
      pages: data.numpages,
      info: data.info,
      metadata: data.metadata
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Analyze document structure and extract key information
 */
function analyzeContent(text, filename) {
  const analysis = {
    filename,
    sections: [],
    topics: [],
    keywords: [],
    codeBlocks: [],
    urls: [],
    headings: []
  };

  // Extract headings (lines that look like titles)
  const lines = text.split('\n');
  const headingPattern = /^[A-Z][A-Za-z\s]{5,80}$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect headings
    if (headingPattern.test(line) && line.length > 10) {
      analysis.headings.push({
        text: line,
        position: i
      });
    }

    // Detect URLs
    const urlMatches = line.match(/https?:\/\/[^\s]+/g);
    if (urlMatches) {
      analysis.urls.push(...urlMatches);
    }
  }

  // Extract code blocks (common patterns)
  const codeBlockPattern = /```[\s\S]*?```|`[^`]+`/g;
  const codeMatches = text.match(codeBlockPattern);
  if (codeMatches) {
    analysis.codeBlocks = codeMatches.slice(0, 10); // Limit to 10 examples
  }

  // Extract common technical keywords
  const technicalTerms = [
    'API', 'function', 'method', 'class', 'interface', 'type', 'module',
    'component', 'service', 'endpoint', 'authentication', 'authorization',
    'database', 'query', 'schema', 'model', 'controller', 'router',
    'middleware', 'configuration', 'deployment', 'testing', 'validation',
    'error', 'exception', 'logging', 'monitoring', 'performance',
    'security', 'encryption', 'token', 'session', 'cookie',
    'HTTP', 'REST', 'GraphQL', 'WebSocket', 'JSON', 'XML',
    'npm', 'node', 'express', 'react', 'vue', 'angular',
    'typescript', 'javascript', 'python', 'java', 'docker'
  ];

  const keywordCounts = {};
  const lowerText = text.toLowerCase();

  for (const term of technicalTerms) {
    const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches && matches.length > 2) {
      keywordCounts[term] = matches.length;
    }
  }

  analysis.keywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([keyword, count]) => ({ keyword, count }));

  // Extract sections based on headings
  for (let i = 0; i < analysis.headings.length; i++) {
    const heading = analysis.headings[i];
    const nextHeading = analysis.headings[i + 1];

    const startPos = heading.position;
    const endPos = nextHeading ? nextHeading.position : lines.length;

    const sectionText = lines.slice(startPos, endPos).join('\n').substring(0, 500);

    analysis.sections.push({
      title: heading.text,
      preview: sectionText.trim(),
      position: startPos
    });
  }

  // Identify main topics based on headings and keywords
  const topicKeywords = analysis.headings.map(h => h.text).slice(0, 5);
  const keywordTopics = analysis.keywords.slice(0, 5).map(k => k.keyword);
  analysis.topics = [...new Set([...topicKeywords, ...keywordTopics])];

  return analysis;
}

/**
 * Generate relationships between documents
 */
function findRelationships(documents) {
  const relationships = [];

  for (let i = 0; i < documents.length; i++) {
    for (let j = i + 1; j < documents.length; j++) {
      const doc1 = documents[i];
      const doc2 = documents[j];

      // Find common keywords
      const keywords1 = new Set(doc1.analysis.keywords.map(k => k.keyword.toLowerCase()));
      const keywords2 = new Set(doc2.analysis.keywords.map(k => k.keyword.toLowerCase()));

      const commonKeywords = [...keywords1].filter(k => keywords2.has(k));

      // Find common topics
      const topics1 = new Set(doc1.analysis.topics.map(t => t.toLowerCase()));
      const topics2 = new Set(doc2.analysis.topics.map(t => t.toLowerCase()));

      const commonTopics = [...topics1].filter(t => topics2.has(t));

      if (commonKeywords.length > 2 || commonTopics.length > 1) {
        relationships.push({
          doc1: doc1.filename,
          doc2: doc2.filename,
          commonKeywords,
          commonTopics,
          strength: commonKeywords.length + commonTopics.length * 2
        });
      }
    }
  }

  return relationships.sort((a, b) => b.strength - a.strength);
}

/**
 * Main analysis function
 */
async function analyzePdfs() {
  console.log('Starting PDF analysis...\n');

  // Get all PDF files
  const files = await fs.readdir(PDF_DIR);
  const pdfFiles = files.filter(f => f.endsWith('.pdf')).sort();

  console.log(`Found ${pdfFiles.length} PDF files\n`);

  const documents = [];

  // Process each PDF
  for (const filename of pdfFiles) {
    const filePath = path.join(PDF_DIR, filename);
    console.log(`Processing: ${filename}`);

    const extracted = await extractPdfText(filePath);

    if (extracted) {
      const analysis = analyzeContent(extracted.text, filename);

      documents.push({
        filename,
        path: filePath,
        pages: extracted.pages,
        info: extracted.info,
        analysis,
        textLength: extracted.text.length,
        textPreview: extracted.text.substring(0, 500).replace(/\s+/g, ' ').trim()
      });

      console.log(`  - Pages: ${extracted.pages}`);
      console.log(`  - Text length: ${extracted.text.length} chars`);
      console.log(`  - Headings: ${analysis.headings.length}`);
      console.log(`  - Keywords: ${analysis.keywords.length}`);
      console.log(`  - Topics: ${analysis.topics.length}\n`);
    }
  }

  // Generate relationships
  console.log('Analyzing document relationships...\n');
  const relationships = findRelationships(documents);

  // Create content index
  const contentIndex = {
    metadata: {
      totalDocuments: documents.length,
      analyzedAt: new Date().toISOString(),
      totalPages: documents.reduce((sum, doc) => sum + doc.pages, 0),
      totalTextLength: documents.reduce((sum, doc) => sum + doc.textLength, 0)
    },
    documents: documents.map(doc => ({
      filename: doc.filename,
      pages: doc.pages,
      textLength: doc.textLength,
      textPreview: doc.textPreview,
      sections: doc.analysis.sections,
      topics: doc.analysis.topics,
      keywords: doc.analysis.keywords,
      headings: doc.analysis.headings.map(h => h.text),
      codeBlocks: doc.analysis.codeBlocks.length,
      urls: doc.analysis.urls.length
    })),
    relationships: relationships.slice(0, 50), // Top 50 relationships
    topicIndex: buildTopicIndex(documents),
    keywordIndex: buildKeywordIndex(documents)
  };

  // Ensure docs directory exists
  const docsDir = path.dirname(OUTPUT_FILE);
  await fs.mkdir(docsDir, { recursive: true });

  // Write output
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(contentIndex, null, 2));

  console.log(`\n✓ Analysis complete!`);
  console.log(`✓ Content index saved to: ${OUTPUT_FILE}`);
  console.log(`\nSummary:`);
  console.log(`  - Documents: ${contentIndex.metadata.totalDocuments}`);
  console.log(`  - Total pages: ${contentIndex.metadata.totalPages}`);
  console.log(`  - Relationships found: ${relationships.length}`);
  console.log(`  - Unique topics: ${Object.keys(contentIndex.topicIndex).length}`);
  console.log(`  - Unique keywords: ${Object.keys(contentIndex.keywordIndex).length}`);

  return contentIndex;
}

/**
 * Build topic to documents index
 */
function buildTopicIndex(documents) {
  const index = {};

  for (const doc of documents) {
    for (const topic of doc.analysis.topics) {
      const topicKey = topic.toLowerCase();
      if (!index[topicKey]) {
        index[topicKey] = [];
      }
      index[topicKey].push(doc.filename);
    }
  }

  return index;
}

/**
 * Build keyword to documents index
 */
function buildKeywordIndex(documents) {
  const index = {};

  for (const doc of documents) {
    for (const { keyword, count } of doc.analysis.keywords) {
      const keywordKey = keyword.toLowerCase();
      if (!index[keywordKey]) {
        index[keywordKey] = [];
      }
      index[keywordKey].push({
        filename: doc.filename,
        count
      });
    }
  }

  // Sort by count
  for (const keyword in index) {
    index[keyword].sort((a, b) => b.count - a.count);
  }

  return index;
}

// Run analysis
if (require.main === module) {
  analyzePdfs().catch(error => {
    console.error('Analysis failed:', error);
    process.exit(1);
  });
}

module.exports = { analyzePdfs, extractPdfText, analyzeContent };
