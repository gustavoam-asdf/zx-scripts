#! ./node_modules/.bin/ts-node

import { $, fs as normalFs, path } from "zx";
import { MYSQL_DATA_DIR, MYSQL_DIR } from "./config.js";

$.verbose = false;
const fs = normalFs.promises;

type MySQLInstance = {
	name: string,
	basedir?: string,
	dataDir?: string,
	port: number,
	"enable-named-pipe"?: boolean,
	socket?: string,
}

function createMySQLInstance(instance: MySQLInstance): Required<MySQLInstance> {
	return {
		...instance,
		basedir: instance.basedir || path.resolve(MYSQL_DIR),
		dataDir: instance.dataDir || path.resolve(`${MYSQL_DATA_DIR}/${instance.name}`),
		"enable-named-pipe": instance["enable-named-pipe"] || true,
		socket: instance.socket || `socket_${instance.name}`,
	}
}

async function main() {
	const instance = createMySQLInstance({
		name: "instance_by_node",
		port: 8000,
	})

	const existDataDir = await fs
		.stat(instance.dataDir)
		.then(() => true)
		.catch(() => false)

	if (!existDataDir) {
		await fs.mkdir(instance.dataDir, { recursive: true })
	}


	const output = (await $`ls ${instance.dataDir}`).stdout.trim();

	console.log(output);
}

main()