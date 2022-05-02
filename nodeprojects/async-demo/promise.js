const p = new Promise((resolve, reject) => {

    //
    resolve(1);
    //reject(new Error('error message'));

});




p.then(result => console.log('Result', result));