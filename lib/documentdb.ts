import { MongoClient, Db } from 'mongodb'

// DocumentDB connection string from environment
// For local dev: Use SSH tunnel to localhost:27017
// For production: Will use EC2 API endpoint or VPC peering
const DOCUMENTDB_URI = process.env.DOCUMENTDB_URI || ''

if (!DOCUMENTDB_URI) {
  console.warn('DOCUMENTDB_URI not set - DocumentDB features will not work')
}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

export async function getDocumentDBClient(): Promise<MongoClient> {
  if (!DOCUMENTDB_URI) {
    throw new Error('DocumentDB URI not configured')
  }

  if (client) {
    return client
  }

  if (!clientPromise) {
    clientPromise = MongoClient.connect(DOCUMENTDB_URI, {
      tls: true,
      tlsAllowInvalidHostnames: true,
    })
  }

  client = await clientPromise
  return client
}

export async function getDatabase(): Promise<Db> {
  const client = await getDocumentDBClient()
  return client.db('udyam')
}

export async function closeConnection() {
  if (client) {
    await client.close()
    client = null
    clientPromise = null
  }
}
