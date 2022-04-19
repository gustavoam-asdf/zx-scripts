#! ./node_modules/.bin/ts-node

import { $ } from "zx";

async function main() {
	$.verbose = false;
	const output = (await $`ls`).stdout.trim();

	console.log(output);
}

main()