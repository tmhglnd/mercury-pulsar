# 🌕 Mercury plugin for Pulsar

This is a simple plugin for Pulsar that allows you to evaluate Mercury code from within the editor. The code is send via OSC on port 4880 to either the Mercury Max version or the Mercury Browser version (running locally!).

* Web version running in the browser (Windows/Mac/Linux) [go to this repo](https://github.com/tmhglnd/mercury-playground)
* Full version running in Max8 (Windows/Mac only) [go to this repo](https://github.com/tmhglnd/mercury)

[**🚀 Start Sketching Online!**](https://mercury-sketch.glitch.me/)

[**🙏 Support Mercury by becoming a Patron**](https://www.patreon.com/bePatron?u=9649817) 

[**💬 Join the Discord Community**](https://discord.gg/vt59NYU)

## 💻 Install

Make sure that `ppm` (pulsar package manager) is installed. On linux, it should be automatically installed with atom. On OSX, go to the 'Atom' menu, and click 'Install Shell Commands'. On windows, it doesn't work as of now, read further. If you don't want to install it because it'd name collide with perl's ppm, replace the ppm command in the following actions with pulsar -p.

Download this repository via 

`$ git clone http://github.com/tmhglnd/mercury-pulsar`

Navigate to the directory and install the dependencies

`$ cd mercury-pulsar` and `ppm install`

Load the package

`$ ppm link .`

### For Windows Users

Download this repository via 

`$ git clone http://github.com/tmhglnd/mercury-pulsar`

Navigate to the directory and install the dependencies with `npm` instead of `ppm`

`$ cd mercury-pulsar` and `npm install`

Manually copy-paste the entire folder `mercury-pulsar` to

`C:\Users\<username>\.pulsar\packages`

## 🙏 Thanks

This plugin was made possible by looking at the source code from the Hydra and Tidal plugins for Atom

- [Atom Hydra](https://github.com/hydra-synth/atom-hydra)
- [Pulsar Tidal](https://github.com/tidalcycles/pulsar-tidalcycles)