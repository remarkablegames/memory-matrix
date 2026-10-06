<p align="center">
  <img src="public/logo.svg" width="150" alt="Memory Matrix">
</p>

# Memory Matrix

[![build](https://github.com/remarkablegames/memory-matrix/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablegames/memory-matrix/actions/workflows/build.yml)
[![test](https://github.com/remarkablegames/memory-matrix/actions/workflows/test.yml/badge.svg)](https://github.com/remarkablegames/memory-matrix/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/remarkablegames/memory-matrix/graph/badge.svg?token=IqRfA9X3VC)](https://codecov.io/gh/remarkablegames/memory-matrix)

🧩 Train your brain with **Memory Matrix**.

**Memory Matrix** is a fast-paced brain-training game that challenges you to remember and recreate patterns on a changing grid. Test your focus, sharpen your memory, and see how far you can go as the matrix grows more challenging.

## Play

Play in your browser:

- [Wavedash](https://wavedash.com/games/memory-matrix/)
- [itch.io](https://remarkablegames.itch.io/memory-matrix)
- [remarkablegames](https://remarkablegames.org/memory-matrix/)

Or download for desktop:

- [Windows](https://github.com/remarkablegames/memory-matrix/releases/latest/download/windows.zip)
- [macOS](https://github.com/remarkablegames/memory-matrix/releases/latest/download/macos.zip)
- [Linux](https://github.com/remarkablegames/memory-matrix/releases/latest/download/linux.zip)

## How to Play

A set of tiles will light up briefly. Then, tap the tiles from memory.

1. Watch the pattern appear.
2. Tap the tiles you remember. Your answer is automatically checked once you've selected the same number of tiles that lit up.
3. The grid size and pattern difficulty increase as you clear rounds.

Choose a mode from the menu:

- **Classic**: One mistake ends the run.
- **Timed**: Start with 60 seconds. Each cleared round adds time, with harder rounds rewarding extra time. A mistake costs time instead of ending the run.

## Accessibility

- Fully playable with a keyboard. Use **Tab** to navigate cells, the arrow keys to move, and **Enter** or **Space** to select.
- Screen readers announce the target count—for example, "Recall 5 tiles"—as well as the current round and remaining time.
- Dark mode follows your system preference, and animations are disabled when reduced motion is enabled.

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablemark/memory-matrix.git
cd memory-matrix
```

Install the dependencies:

```sh
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

Open [http://127.0.0.1:5173](http://127.0.0.1:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

### `npm run lint`

Checks the code quality.

### `npm run lint:tsc`

Checks for type errors.

### `npm test`

Runs the tests.

## License

[MIT](LICENSE)
