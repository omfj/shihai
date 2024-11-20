import * as schema from "../src/storage/db/schemas/mod";
import { pgGenerate } from "drizzle-dbml-generator";

const out = "./schema.dbml";
const relational = true;

pgGenerate({ schema, out, relational });

process.exit(0);
