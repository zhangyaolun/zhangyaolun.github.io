/* * 
 * audio visualizer with html5 audio element
 *
 * v0.1.0
 * 
 * licenced under the MIT license
 * 
 * see my related repos:
 * - HTML5_Audio_Visualizer https://github.com/wayou/HTML5_Audio_Visualizer
 * - 3D_Audio_Spectrum_VIsualizer https://github.com/wayou/3D_Audio_Spectrum_VIsualizer
 * - selected https://github.com/wayou/selected
 * - MeowmeowPlayer https://github.com/wayou/MeowmeowPlayer
 * 
 * reference: http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
 */

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;


window.onload = function() {
    var audio = document.getElementById('audioDemo');
    
    var ctx = new AudioContext();
    var analyser = ctx.createAnalyser();
    var audioSrc = ctx.createMediaElementSource(audio);
    console.log(ctx)
    console.log(analyser)
    console.log(audioSrc)
    // we have to connect the MediaElementSource with the analyser 
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
    // analyser.fftSize = 64;
    // frequencyBinCount tells you how many values you'll receive from the analyser

    // we're ready to receive some data!
    var canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 20, //width of the meters in the spectrum
        gap = 4, //gap between meters
        capHeight = 2,
        capStyle = '#fff',
        meterNum = 400 / (20 + 2), //count of the meters
        capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
    ctx = canvas.getContext('2d'),
    gradient = ctx.createLinearGradient(0, 0, 0, 110);
    gradient.addColorStop(1, '#0f0');
    gradient.addColorStop(0.5, '#ff0');
    gradient.addColorStop(0, '#f00');
    
    
    // loop
    function renderFrames() {
    	console.log(analyser)
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        
        var step = Math.round(array.length / meterNum); //sample limited data from the total array
        
        ctx.clearRect(0, 0, cwidth, cheight);
        var i = 0;
        var value = array[i * step ];
       /* for (var i = 0; i < meterNum; i++) {
            var value = array[i * step ];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            };
            console.log(step)
            ctx.fillStyle = capStyle;
            //draw the cap, with transition effect
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 22, cheight - (--capYPositionArray[i])/3, meterWidth, capHeight);
            } else {
                ctx.fillRect(i * 22, cheight - value/3, meterWidth, capHeight);
                capYPositionArray[i] = value;
            };*/
            ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
            ctx.fillRect(i * 22 /*meterWidth+gap*/ , cheight - value/3 + capHeight, meterWidth, cheight); //the meter
        /*}*/
        requestAnimationFrame(renderFrames);
    }
    renderFrames();
    audio.play();
};
