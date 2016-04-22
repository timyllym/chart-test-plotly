var timer, counter, that, startval, numberOfPoints;

Polymer({
    is: "chart-test-app",
    properties: {
        cols: {
            type: Array,
            value: []
        },
        rows: {
            type: Array,
            value: []
        },
        mychart: {
            type: Object
        }
    },
    initChart() {
        this.mychart = document.getElementById('mychart');
        for (var i = 0; i<numberOfPoints; i++) {
            that.cols.push(i);
            that.rows.push(Math.random()*20);
        }
    	Plotly.plot( this.mychart, [{
    	x: this.cols,
    	y: this.rows }], {
    	margin: { t: 0 } } );
        console.log( Plotly.BUILD );
        $("#mychart").bind('plotly_relayout', function(event, eventdata) {
            console.log('x-axis start:' + eventdata['xaxis.range[0]']);
            var newstartval = Math.round(eventdata['xaxis.range[0]']);
            var cols2 = [];
            var rows2 = [];
            if (newstartval < 0) {
                for (var i = startval; i>=newstartval; i--) {
                    cols2.splice(0,0,i);
                    rows2.splice(0,0,Math.random()*20);
                }
                startval = newstartval;
                that.cols = cols2.concat(that.cols);
                that.rows = rows2.concat(that.rows);
                that.mychart.data = [{x:that.cols, y:that.rows}];
                Plotly.redraw(that.mychart);
            }
        });
    },
    resizeWindow() {

    },
    attached() {
        numberOfPoints = 2800;
        that = this;
        window.addEventListener("resize", this.resizeWindow);
        this.initChart();
        console.log( 'ready');
        var socket = io();
        socket.emit('test message', 'test');
        socket.on('test message', function(msg) {
            console.log( 'test message: ' + msg);

        });
        counter = numberOfPoints;
        startval = 0;
        timer = setInterval(function() {
            that.cols.push(counter);
            counter++;
            that.rows.push(Math.random()*20);
            Plotly.redraw(this.mychart);
        }, 1000);
    },
    detached() {
        window.removeEventListener("resize", this.resizeWindow);
    }
});
