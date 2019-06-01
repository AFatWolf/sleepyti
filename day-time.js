class dayTime {
    // convert normal am pm time to standard time
    constructor(hour, minute, ampm) {
        if(typeof hour === "string")
            this.hour = parseInt(hour, 10);
        else
            this.hour = hour;
        if(typeof minute === "string")
            this.minute = parseInt(minute, 10);
        else
            this.minute = minute;
        this.ampm = ampm.toUpperCase();
        if(ampm.toLowerCase() === 'PM'.toLowerCase() && this.hour <= 12)
        {
            this.hour += 12;
            if(this.hour === 24)
                this.hour = 0;
        }
    }
    second_constructor(hour, minute) {
        this.hour = hour;
        this.minute = minute;
    }
    addHour(hour)
    {
        this.hour += hour;
        while(this.hour >= 24)
            this.hour -= 24;
        while(this.hour < 0)
            this.hour += 24;
    }
    addMinute(minute)
    {
        if(minute === 0)
            return;
        let hour = Math.floor( (Math.abs(minute) / minute) * Math.abs(minute) / 60 );
        minute = (Math.abs(minute) / minute) * minute % 60;

        this.minute = this.minute + minute;
        if(this.minute >= 60)
        {
            this.minute -= 60;
            this.addHour(1);
        }
        if(this.minute < 0)
        {
            this.minte += 60;
            this.addHour(-1);
        }
        this.addHour(hour);
    }
    addTime(hour, minute)
    {
        this.addMinute(minute);
        this.addHour(hour);
    }
    minusTime(hour, minute)
    {
        this.addMinute(-minute);
        this.addHour(-hour);
    }
    convertToAmpmTime()
    {
        var tmp = new dayTime(this.hour, this.minute, "pm");
        tmp.hour = this.hour;
        this.minute = this.minute;
        
        if(tmp.hour > 12)
        {
            console.log("____ Did run ___ ");
            tmp.minusTime(12, 0);
            tmp.ampm = 'PM';
        }
        else
            tmp.ampm = 'AM';
        return tmp;
    }
    toString()
    {
        var tmp = new dayTime(0, 0, this.ampm);
        tmp.hour = this.hour;
        tmp.minute = this.minute;
        tmp.hour = tmp.hour.toString();
        tmp.minute = tmp.minute.toString();
        while(tmp.minute.length < 2)
            tmp.minute = "0" + tmp.minute;
        return tmp;
    }
}

module.exports = dayTime;