// import neo4j from "neo4j-driver";
// import { env } from "@/env";
// import type { Session } from "neo4j-driver";

// const driver = neo4j.driver(
//   "neo4j://localhost:7687",
//   neo4j.auth.basic("test", "test1234"),
// );

// const globalForNeo4j = globalThis as unknown as {
//   neo4j: Session | undefined;
// };

// export const dbSession = globalForNeo4j.neo4j ?? driver.session();

// if (false) globalForNeo4j.neo4j = dbSession;

import neo4j from "neo4j-driver";

// const driver = neo4j.driver(
//   process.env.NEO4J_URI ?? "neo4j://localhost:7687",
//   neo4j.auth.basic("neo4j", "password"),
// );

const driver = neo4j.driver("neo4j+s://0820e2e0.databases.neo4j.io", neo4j.auth.basic("neo4j", "Y5S8jfhGTLfK6R_KG7CHN_EfeDv0doTOrGJoDhYNcH4"));

export const dbSession = driver.session();
