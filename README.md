to run in desktop (electron) mode:
1. `npm run build` (creates bundles in /dist folder)
2. `npm start` (launches electron app using bundles built in the previous step)

to run in browser:
1. `npm run serve` (uses webpack-dev-server to serve compiled js from memory)

To package electron distibutable:
1. `npm run build`
2. `npm run package`

