
## Install
`pnpm add -g @archetype-org/create-bos-app`

## Usage
After installing globally, simply run the CLI to kickstart your new BOS app or widget:
```bash
create-bos-app
```

To run locally, make sure you have [bos-workspace](https://github.com/sekaiking/bos-workspace) installed.

Then, run the command:

```bash
bw dev
```

This will serve the widgets from `http://127.0.0.1:4040/`.

## Deploy
To deploy & manage your components, you can use [bos-cli](https://github.com/bos-cli-rs/bos-cli-rs), or [near-cli](https://github.com/near/near-cli).
Future versions of this tool will include similar command, so you can scaffold and deploy from one place.

## Contributing
This is currently just a lightweight tool focussed on quickly scaffolding BOS apps. Contributions are extremely welcome, so if you have any ideas or suggestions, please feel free to open an issue or pull request. 

## License
MIT