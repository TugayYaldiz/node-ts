<div align="center">

# Node.js & Typescript Boilerplate
<br />

</div>

### Dependencies ###

* Node.js `>= 14.0.0`

### Development Dependencies ###

* Git `>= 2.13.0`
* TypeScript `>= 3.8.3`


### Development ###

```shell
$ npm install                 # installs dependencies
$ npm run dev                 # starts development server with inscpect mode for debugging
```

### Prettify ###

`npm run pretty` for prettify `*.ts` files

### Tests ###

`npm run test` for running all tests. For running test on single folder or file use `npm run test:single src/test/helper`.

### Coverage ###

`npm run test:coverage` for generating coverage. Coverage results can be found in `coverage/index.html`.

### FAQ

- **Q**: Why `git push` fails? I can't push my code to remote.

- **A**: Highly possible due to:
  - Some tests was failed.
    - You should `write the tests` for the changes you are trying to make.
  - Coverage doesn't within threshold 100%.
    - Coverage `threshold is 100%` so tests must cover all lines, functions, branches and statements.

--------