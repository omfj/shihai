import * as schema from '../src/db/schemas';
import { pgGenerate } from 'drizzle-dbml-generator';

const out = './schema.dbml';
const relational = true;

pgGenerate({ schema, out, relational });
