# Clubhouse Clone

This repo contains a Clubhouse clone implemented with SignalWire APIs. It contains both the frontend and the backend.

Branches:
 - [master](https://github.com/signalwire/browser-audioconf-example/tree/master): full implementation
 - [livewire](https://github.com/signalwire/browser-audioconf-example/tree/livewire): partial implementation for live coding

## Starting the application

From the root directory, run `npm install` to install the dependencies. To start the backend and the frontend together, run `npm run start`. Your server will listen at http://localhost:8080, while the frontend will be available at http://localhost:3000.

NOTE: You need to configure your authentication information in [backend/.env](backend/.env).

## Resources

Follow the step-by-step guide at https://developer.signalwire.com/apis/docs/making-a-clubhouse-clone