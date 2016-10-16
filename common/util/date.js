// 日期计算 
// 格式 date: 20460101
function DateCalc(date, bef, aft){
    if(date){
        this.date = [date.substr(0,4), '-', date.substr(4,2), '-', date.substr(-2)].join('')
    }else{
        var d = new Date(); 
        this.date = [d.getFullYear(), '-', d.getMonth()+1, '-', d.getDate()].join('')
    }
    this.bef = bef || 0;
    this.aft = aft || 0;
    this.monthArr = ['00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    this.monthENArr = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

DateCalc.prototype = {
    constructor: DateCalc,

    now: function(){
        var d = this.date ? new Date(this.date) : new Date();
        return [d.getFullYear(), this._cover(d.getMonth()+1), this._cover(d.getDate())].join('');     
    },
    before: function(days){
        return this._calc(days || 1,'before');
    },
    after: function(days){
        return this._calc(days || 1,'after');
    },
    month: function(){
        var d = this.date ? new Date(this.date) : new Date();
        return [d.getFullYear(), this._cover(d.getMonth()+1)].join('');     
    },
    monthEN: function(){
        var d = this.date ? new Date(this.date) : new Date();
        return this.monthENArr[parseInt(this.month().substr(4,2))];    
    },
    beforeMonth: function(){
        var y = parseInt(this.month().substr(0,4), 10),
            m = this.month().substr(4,2),
            idx = this.monthArr.indexOf(m);
        if(idx == 1){
            m = '12';
            y--;
        }else {
            console.log(this.monthArr[1].num, this.monthArr[idx-1])
            m = this.monthArr[idx-1].num;
        }
        return y + '' + m;
    },
    afterMonth: function(){
        var y = parseInt(this.month().substr(0,4), 10),
            m = this.month().substr(4,2),
            idx = this.monthArr.indexOf(m);
        if(idx == 12){
            m = '01';
            y++;
        }else {
            m = this.monthArr[idx+1].num;
        }
        return y + '' + m;
    },
    CHN: function(dtime){
        dtime = dtime ? dtime : this.now()
        var y = dtime.substr(0,4)+'年',
            m = dtime.substr(4,2)+'月',
            d = dtime.substr(6,2)+'日';
        return y+m+d;
    },
    // days 前后的天数
    // type before 或 after
    _calc: function(days, type){
        var d = new Date(this.date),
            input = 0;
            if(type === 'before') {
                input = 0 - this.bef;
                days = 0 - days;
            }else {
                input = this.aft;
            }
            var total = days || input || 0;

        var newDate = new Date(d.getTime() + 3600*24*1000*total);
        return [newDate.getFullYear(), this._cover(newDate.getMonth()+1), this._cover(newDate.getDate())].join('');
    },    
    _cover:function(num){
        var n = parseInt(num, 10);
        return n < 10 ? '0' + n : n;
    }
}

module.exports = DateCalc;

