Polymer({
    is: "chart-test-app",
    properties: {
        cols: {
            type: Array,
            value: [{"label": "Data", "type": "string"},{"label": "Value", "type": "number"}]
        },
        rows: {
            type: Array,
            value: [["Col1", 5.0],["Col2", 5.0],["Col3", 5.0]]
        },
        mychart: {
            type: Object
        }
    },
    initChart() {
        this.mychart = document.getElementById('mychart');
    	Plotly.plot( this.mychart, [{
    	x: [1, 2, 3, 4, 5],
    	y: [1, 2, 4, 8, 16] }], {
    	margin: { t: 0 } } );
        console.log( Plotly.BUILD );
    },
    resizeWindow() {

    },
    attached() {
        window.addEventListener("resize", this.resizeWindow);
        this.initChart();
        console.log( 'ready');
        var socket = io();
        socket.emit('test message', 'test');
        socket.on('test message', function(msg) {
            console.log( 'test message: ' + msg);

        });
    },
    detached() {
        window.removeEventListener("resize", this.resizeWindow);
    }
});
