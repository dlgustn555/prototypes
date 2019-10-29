import React from 'react'
import ReactDOM from 'react-dom'
const PROCESSES = [
    'isToday',
    'isSameMonth',
    'isWithinThirtyDays'
  ];
  const TODAY = new Date();
  const YEAR_START = new Date(TODAY.getFullYear(), 0, 1);
  const YEAR_END = new Date(TODAY.getFullYear(), 11, 31);
  
  class App extends React.Component {
    constructor () {
      super();
      
      this.state = {
        dataSet: [],
        de: [],
        tGenerate: null,
        isTodayMoment: null,
        isTodayNative: null
      };
      
      this.start = this.start.bind(this);
      this.getData = this.getData.bind(this);
      this.isToday = this.isToday.bind(this);
    }
  
    start () {
      const dataSet = this.getData(this.entries.value);
      this.setState({dataSet: dataSet});
    }
  
    getRandomDate (start = YEAR_START, end = YEAR_END) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
    getData (entries) {
      const dataSet = [];
      const tGenerateA = performance.now();
      
      for (let i = 0; i <= entries; i++) {
        dataSet.push({
          id: i,
          date: this.getRandomDate()
        });
      }
      
      const tGenerateB = performance.now();
      
      this.setState({tGenerate: tGenerateB - tGenerateA});
      
      PROCESSES.forEach(processName => {
        this.processDataset(processName, dataSet);
        this.processDataset(processName, dataSet, false);
      });
      
      return dataSet;
    }
    
    updateState (useMoment, name, newValues) {
      const setName = useMoment ? `${name}Moment` : `${name}Native`;
      this.setState({[setName]: newValues});
    }
    
    isToday (data, useMoment, today) {
      if (useMoment) {
        const day = moment(data.date);
        return today.isSame(day, 'day');
      } else {
        const day = new Date(data.date);
        return today.getDate() === day.getDate() &&
          today.getMonth() === day.getMonth() &&
          today.getFullYear() === day.getFullYear() ? 1 : 0;
      }
    }
    
    isSameMonth (data, useMoment, today) {
      if (useMoment) {
        const day = moment(data.date);
        return today.isSame(day, 'month');
      } else {
        const day = new Date(data.date);
        return today.getMonth() === day.getMonth() &&
          today.getFullYear() === day.getFullYear() ? 1 : 0;
      }
    }
    
    isWithinThirtyDays (data, useMoment, today, thirtyDays) {
      if (useMoment) {
        return moment(data.date).isBetween(today, thirtyDays);
      } else {
        const day = new Date(data.date).getTime();
        return day > today.getTime() && day < thirtyDays.getTime();
      }
    }
    
    processDataset (processName, dataSet, useMoment = true) {
      const tA = performance.now();
      const today = useMoment ? moment(TODAY) : new Date(TODAY);
      const thirtyDays = useMoment ? today.clone().add(30, 'days') : new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
      
      const total = dataSet.reduce((count, data) => {
        switch (processName) {
          case 'isToday':
          case 'isSameMonth':
            count += this[processName](data, useMoment, today) ? 1 : 0;
          case 'isWithinThirtyDays':
            count += this.isWithinThirtyDays(data, useMoment, today, thirtyDays) ? 1 : 0;
        }
        return count;
      }, 0);
  
      const tB = performance.now();
      
      this.updateState(useMoment, processName, {
        time: tB - tA,
        value: total
      });
    }
    
    render () {
      return (
        <div className='app'>
          <div className='generate'>
            <label htmlFor='size'>Size of Data</label>
            <select id='size' ref={c => this.entries = c}>
              <option value={500}>500</option>
              <option value={1000} selected>1,000</option>
              <option value={10000}>10,000</option>
              <option value={25000}>25,000</option>
            </select>
            <button type='button' onClick={this.start}>RUN TEST</button>
          </div>
          <div className='bms'>
            {PROCESSES.map((processName, i) => {
              const sMoment = this.state[`${processName}Moment`];
              const sNative = this.state[`${processName}Native`];
              
              const tMoment = sMoment ? sMoment.time : 0;
              const tNative = sNative ? sNative.time : 0;
              const total = tMoment + tNative;
              const pMoment =  tMoment / total * 100;
              const pNative =  tNative / total * 100;
              const intCheck = sMoment && sNative ? sMoment.value === sNative.value : false;
                
              return (
                <div key={i} className='bms__process'>
                  <h2 className='bms__process__title'>{processName}</h2>
                  <div className='bms__bm bms__bm--moment'>
                    <div className='bms__bm__graph'>
                      <div className={`bms__bm__graph__fill ${!!this.state.dataSet.length ? '' 
  : 'bms__bm__graph__fill--empty'}`} style={{width: pMoment + '%'}} />
                      <div className='bms__bm__graph__value'>{tMoment.toFixed(3)}ms</div>
                    </div>
                    <div className='bms__bm__label'>Moment.js</div>
                  </div>
                  
                  <div className='bms__bm bms__bm--native'>
                    <div className='bms__bm__graph'>
                      <div className={`bms__bm__graph__fill ${!!this.state.dataSet.length ? '' 
  : 'bms__bm__graph__fill--empty'}`} style={{width: pNative + '%'}} />
                      <div className='bms__bm__graph__value'>{tNative.toFixed(3)}ms</div>
                    </div>
                    <div className='bms__bm__label'>Native</div>
                  </div>
                  
                  <div className='bms__bm__check'>
                    Integrity Check
                    <span className={`bms__bm__check__status bms__bm__check__status--${intCheck}`}></span>
                  </div>
                </div>
              );    
            })}
          </div>
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('content')
  );