# 🌕 Mercury plugin for Pulsar

This is a simple plugin for Pulsar that allows you to evaluate Mercury code from within the editor. The code is send via OSC on port 4880 to either the Mercury Max version or the Mercury Browser version (running locally!).

* Web version running in the browser (Windows/Mac/Linux) [go to this repo](https://github.com/tmhglnd/mercury-playground)
* Full version running in Max8 (Windows/Mac only) [go to this repo](https://github.com/tmhglnd/mercury)

[**🚀 Start Sketching Online!**](https://mercury-sketch.glitch.me/)

[**🙏 Support Mercury by becoming a Patron**](https://www.patreon.com/bePatron?u=9649817) 

[**💬 Join the Discord Community**](https://discord.gg/vt59NYU)

## 💻 Install

Make sure that `ppm` (Pulsar Package Manager) is installed. On linux, it should be automatically installed with Atom. On OSX, go to the `Pulsar` menu and click `Install Shell Commands`.

1. Download this repository via 

`$ git clone http://github.com/tmhglnd/mercury-pulsar`

2. Navigate to the directory and install the dependencies

`$ cd mercury-pulsar` and `ppm install`

3. Load the package

`$ ppm link .`

4. Restart Pulsar

### For windows users

Windows doesn't support `ppm`, instead use `npm` and the following steps:

1. Download this repository via 

`$ git clone http://github.com/tmhglnd/mercury-pulsar`

2. Navigate to the directory and install the dependencies with `npm` instead of `ppm`

`$ cd mercury-pulsar` and `npm install`

3. Manually copy-paste the entire folder `mercury-pulsar` to

`C:\Users\<username>\.pulsar\packages`

## 🎮 Usage

1. Start up either Mercury for Max or the Mercury Playground (running locally!, see instructions below)

2. Create an empty file to open with Pulsar and write your code in. This can be a plain `.txt` file.

3. Go to `Packages` > `Open Package Manager`, find the mercury package and click on `Enable`.

4. The package should be automatically activated. You can toggle the package on/off with `shift` `cmd` `p`, search for `mercury:toggle` and `enter`.

5. Type some code and:

	- Evaluate with `cmd/ctrl/alt`+`enter` 

	- Silence the sound with `cmd/ctrl/alt`+`.`

	- Randomize variables `cmd/ctrl/alt`+`shift`+`r`

### Mercury Max version

- [Follow these instructions to install the Mercury Max version](https://github.com/tmhglnd/mercury#-install)

### Mercury Browser version

- [Follow these instructions to run the Mercury Playground locally](https://github.com/tmhglnd/mercury-playground#-running-without-internet)

## 🙏 Thanks

This plugin was made possible by looking at the source code from the Hydra and Tidal plugins for Atom

- [Atom Hydra](https://github.com/hydra-synth/atom-hydra)
- [Pulsar Tidal](https://github.com/tidalcycles/pulsar-tidalcycles)