class NavaSepehr {
    constructor (NavaSepehrName,NavaSepehrWidth,NavaSepehrHeight,NavaSepehrRatio) {
        let _this = this;
        this._WindowInnerWidth = "";
        this._WindowInnerHeidth="";
        this._name=NavaSepehrName;
        this._Width=NavaSepehrWidth;
        this._Height=NavaSepehrHeight;
        this._Ratio=NavaSepehrRatio;   
        window.addEventListener('resize', function() {
            console.log('Sepehr PageWidth changed',Sepehr)
            _this._WindowInnerWidth=window.innerWidth;
            _this._WindowInnerHeidth=window.innerHeight;
        })
    }
    static info() {
        return 'Sepehr, helps you to create and present an app inside of your page. It receives Width, Height and Ratio'
    }
}

class Navasaz {
    static StaticNode = 0;
    
    constructor () {
        this._PlayInfo="";
        this._AudioContext=new AudioContext;
        this._Amplitude=this._AudioContext.createGain();
        this._Oscillator = null;
        this._isPlaying=false;
        Navasaz.StaticNode = Navasaz.StaticNode + 1;
        this._Node = Navasaz.StaticNode;
    }
    static info() {
        return 'Navasaz is a Nava node, an oscillator'
    }    
    decrease_time(decreaseTime) {
        this._Amplitude.gain.exponentialRampToValueAtTime(0.00001,this._AudioContext.currentTime+decreaseTime);
    }
    play(Lfreq, Lgain) {
        if (this._isPlaying) {
            this._Oscillator.frequency.setValueAtTime(Lfreq, this._AudioContext.currentTime);
            this._Amplitude.gain.value = Lgain;
        }
        else {
            this._Amplitude.connect(this._AudioContext.destination);
            this._Amplitude.gain.value = Lgain;
            this._Oscillator = this._AudioContext.createOscillator();
            this._Oscillator.type = 'sine';
            this._Oscillator.frequency.value = Lfreq;
            this._Oscillator.connect(this._Amplitude);
            this._Oscillator.start();
            this._isPlaying = true;
        }
        this._PlayInfo = 'Freq:'+(Lfreq.toString()).padStart(4, '0') +', Ampl:'+ (Lgain.toString()).padStart(4, '0')+'';
        return this._PlayInfo;
    }
    Play_NavaNote(LNavaNote) {
        this.play(0,0)
        let _this = this;
        setTimeout(function() {
        //console.log(LNavaNote)
        //console.log(_this)

        _this._Oscillator.frequency.setValueAtTime((LNavaNote.frequency), _this._AudioContext.currentTime);
        _this._Amplitude.gain.setValueAtTime(LNavaNote.amplitude, _this._AudioContext.currentTime);
        _this._Oscillator.type = LNavaNote.shape;
        _this.decrease_time(LNavaNote.decreaseTime);
       }, LNavaNote.time);
    }
}
class drawNote {
    constructor (NavaArraytoDraw) {
        this._data = NavaArraytoDraw;
    }
    static info() {
        return 'it draws circle on the NavaBoard and it show the place of the note on board'
    }
    draw() {

        for (let index = 0; index < this._data.length; index++) {
            
            this.oneCircle(this._data[index]);       

        }


    }
    oneCircle(LNavaNote) {

        setTimeout(function() {
            console.log(LNavaNote.frequency,LNavaNote.amplitude)
            NAVABOARD_BASE.append('circle')
                .attr('cx',LNavaNote.frequency)
                .attr('cy',1000*LNavaNote.amplitude)
                .attr('fill','rgb('+73+','+80+','+100+')')
                .attr('r',0)
                .transition()
                .attr('fill','rgb('+173+','+180+','+200+')')
                .attr('r',10)
                .duration(400)
                .attr('opacity',1)
                .transition()
                .attr('fill','rgb('+73+','+80+','+100+')')
                .attr('r',0)
                .attr('opacity',.04)
                .duration(3000)
        }, LNavaNote.time);

    }
}

class NavaNote {
    constructor() {
        this.frequency = null;
        this.shape = null;
        this.amplitude = null;
        this.duration = null;
        this.decreaseTime = null;
        this.time = null;
        this.gah = null;
        this.nava = null;
        this.scope = null;
    }
    static info() {
        return 'frequency, shape,amplitude,duration,decreaseTime(how long till its sound ends),time(play after currentTime of the start),gah(musical structure of intervals, sequences),scope(min and max frequencies), nava(related sequences)'
    }
}

class Naghme {
    constructor (Lname) {
        this._name = Lname;
        this._defaultnavasaz = new Navasaz;
        this._navasaz = [];
        this._navasaz.push(this._defaultnavasaz)
        this._data = [];
        this._defaultData = new NavaNote;
        this._data.push(this._defaultData);
        this._lenght=null;
    }
    static info() {
        return 'Naghme performs a sequence of notes, using Navasaz'
    }
    getData(NavaNaghme) {
        this._data = NavaNaghme;
        this._lenght = NavaNaghme.length;
    }
    play_naghme() {
        for (let index = 0; index < this._data.length; index++) {
            var newNavasaz = new Navasaz;
            
            newNavasaz.Play_NavaNote(this._data[index]);       

        }
    }
}


var Maraghei = [100,94.9,91.8,88.9,84.4,81.6,79.0,75.0,71.2,68.9,66.7,63.3,61.2,59.3,56.3,54.4,52.7,50.0,45.9,44.4,42.2,40.8,39.5,37.5,35.6,33.3,31.6]
var Maraghei2 = [100,91.8,,84.4,75.0,100,91.8,84.4,75.0,66.7,100,91.8,84.4,75,66.7,66.7,100,91.8,,84.4,75,66.7]


var NaghmeFal = [];
for (let index = 0; index < 88; index++) {
    let NoteToPlay = new NavaNote;
    NoteToPlay.frequency = ((40000/Maraghei2[parseInt((Math.random()*17))])).toFixed(0);
    NoteToPlay.shape = 'sine';
    NoteToPlay.amplitude = Math.random();
    NoteToPlay.duration = 1;
    NoteToPlay.decreaseTime = 12;
    NoteToPlay.time = 500+(Math.random()*100000);
    NoteToPlay.gah = null;
    NoteToPlay.nava = null;
    NoteToPlay.scope = null;
    //console.log(NoteToPlay)
    NaghmeFal.push(NoteToPlay)
}
//console.log(NaghmeFal)

function BeNavaz() {
        var newNava = new Naghme('Naghme');    
        newNava.getData(NaghmeFal);
        console.log(newNava);
        newNava.play_naghme();
        dNoteNava = new drawNote(NaghmeFal);
        dNoteNava.draw()
}