/**
 *
 * Created by piroyoung on 11/24/15.
 */
var context = new AudioContext();

//Coverting note-number to frequency of wave
function getFreq(num) {
    return 220 * Math.pow(2, num / 12);
}

//Convert beat-number for time(sec)
function beatToTime(when) {
    return when * 60.0 / bpm;
};

var pitchMap = {
    "C": -9,
    "Cs": -8,
    "D": -7,
    "Ds": -6,
    "E": -5,
    "F": -4,
    "Fs": -3,
    "G": -2,
    "Gs": -1,
    "A": 0,
    "As": 1,
    "B": 2
};

// Mapping between pitch to distance
var intervalMap = {
    "P1": 0,
    "m2": 1,
    "M2": 2,
    "m3": 3,
    "M3": 4,
    "P4": 5,
    "d5": 6,
    "P5": 7,
    "m6": 8,
    "M6": 9,
    "m7": 10,
    "M7": 11,
    "P8": 12
};

// notes: Array of note-number
// ex:A major = [0, 4, 7]
var Notes = function(notes, shift, gain) {

    //set a default value for octave shift
    if(shift == null) {
        shift = 0;
    }
    if(gain == null) {
        gain = 1;
    }

    //Play sount of note, start at `start1 until `start + len`
    var playOsc = function(note, start, len) {
        var freq = getFreq(note + 12 * shift);
        var osc = context.createOscillator();
        var gn = context.createGain();
        var pivotTime = context.currentTime + 0.5;

        osc.type = "sine";
        osc.frequency.value = freq;
        gn.gain.value = gain;
        osc.connect(gn);
        gn.connect(context.destination);

        osc.start(pivotTime + beatToTime(start));
        osc.stop(pivotTime + beatToTime(start) + beatToTime(len));
    };

    //Play each notes at the same time
    this.play = function(start, len) {
        for (var n in notes) {
            playOsc(notes[n], start, len);
        };
    };
}

// sample of mapping between chord and pitch
var Chord = function(root) {
    //Get the note-num from scale symbol
    var rootNum = pitchMap[root];

    //Chord expression as a member
    this.M = new Notes(
        ["P1", "M3", "P5"].map(function(e) {
            return intervalMap[e] + rootNum;
        }),0, 0.1
    );
    this.m = new Notes(
        ["P1", "m3", "P5"].map(function(e) {
            return intervalMap[e] + rootNum;
        }),0, 0.1
    );
    this.M7 = new Notes(
        ["P1", "M3", "P5", "M7"].map(function(e) {
            return intervalMap[e] + rootNum;
        }),0, 0.1
    );
    this.m7 = new Notes(
        ["P1", "m3", "P5", "m7"].map(function(e) {
            return intervalMap[e] + rootNum;
        }),0, 0.1
    );
    this.dom7 = new Notes(
        ["P1", "M3", "P5", "m7"].map(function(e) {
            return intervalMap[e] + rootNum;
        }),0, 0.1
    );
}

var Bass = function(root) {
    var rootNum = pitchMap[root];

    this.P1 = new Notes(["P1"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.m2 = new Notes(["m2"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.M2 = new Notes(["M2"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.m3 = new Notes(["m3"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.M3 = new Notes(["M3"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.P4 = new Notes(["P4"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.d5 = new Notes(["d5"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.P5 = new Notes(["P5"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.m6 = new Notes(["m6"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.M6 = new Notes(["M6"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.m7 = new Notes(["m7"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.M7 = new Notes(["M7"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );
    this.P8 = new Notes(["P8"].map(function(e) {
            return intervalMap[e] + rootNum;
        }), -1, 1
    );

}
var ChordSynth = function(bpm) {

    this.C = new Chord("C");
    this.Cs = new Chord("Cs");
    this.D = new Chord("D");
    this.Ds = new Chord("Ds");
    this.E = new Chord("E");
    this.F = new Chord("F");
    this.Fs = new Chord("Fs");
    this.G = new Chord("G");
    this.Gs = new Chord("Gs");
    this.A = new Chord("A");
    this.As = new Chord("As");
    this.B = new Chord("B");

}

var BassSynth = function(bpm) {

    this.C = new Bass("C");
    this.Cs = new Bass("Cs");
    this.D = new Bass("D");
    this.Ds = new Bass("Ds");
    this.E = new Bass("E");
    this.F = new Bass("F");
    this.Fs = new Bass("Fs");
    this.G = new Bass("G");
    this.Gs = new Bass("Gs");
    this.A = new Bass("A");
    this.As = new Bass("As");
    this.B = new Bass("B");

}

