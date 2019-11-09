console.log('Worker DEfault');

import { self } from 'react-native-threads';

// listen for messages
self.onmessage = (action) => {
    console.log({ actionWorkedCalled: action });
}

// send a message, strings only
self.postMessage('Worker Initialized');