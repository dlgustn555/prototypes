import React from 'react';
import './App.css';
import {getUA, isAndroid, isIOS} from 'react-device-detect'


function App() {
  const userAgent = getUA
  const naverAppUserAgentRegEx = /NAVER\([inapp|higgs]+;[^0-9]*search;[^0-9]*(\d+);[^0-9]*(\d+.\d+.\d+).*\)/gim
  const matchingData = naverAppUserAgentRegEx.exec(userAgent)

  const friends = 'https://dev.friends.naver.com'
  const pay = 'https://new-alpha-m.pay.naver.com'

  const getNaverAPPInfo = () => {
    return !matchingData
      ? {
          userAgent,
          isNaverApp: false,
          serviceCode: 0,
          appVersion: 0,
          availableTouchId: false,
          availableOfflineQR: false,
          availableMiniApp: false
      }
      : {
          userAgent,
          match: matchingData[0],
          isNaverApp: true,
          serviceCode: matchingData[1],
          appVersion: matchingData[2]          
      }
  }
  const handleProfileClick = (event) => {
    event.preventDefault();
    const { isNaverApp } = getNaverAPPInfo()

    if (isNaverApp) {
      window.location.href = `${friends}/home?svc=pay&url=${encodeURIComponent(pay)}`

  } else if (isAndroid || isIOS) {
    window.location.href = `intent://inappbrowser?version=30&url=${encodeURIComponent(`${friends}/home?svc=pay&url=`)}${pay}#Intent;scheme=naversearchapp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.search;end`

    if (isIOS) {
        const appstoreUrl = 'http://itunes.apple.com/kr/app/id393499958?mt=8'
        const clickedAt = +new Date()
        setTimeout(() => {
          console.log('ININ')
          if (+new Date() - clickedAt < 2000) {
            console.log('aaa')
            window.location.href = appstoreUrl
            console.log(window.location.href, appstoreUrl)
          }
        }, 1500)
    }
  } 
  }

  return (
    <div className="App">
      <p>userAnge: { userAgent }</p>
      <p>matchingData: { matchingData }</p>
      <p>isNaverApp: { getNaverAPPInfo().isNaverApp }</p>
      <p>serviceCode: { getNaverAPPInfo().serviceCode }</p>
      <p>appVersion: { getNaverAPPInfo().appVersion }</p>
      <p>isAndroid: { isAndroid ? ' TRUE' : 'FALSE' }</p>
      <p>isIOS: { isIOS ? 'TRUE' : 'FALSE' }</p>
      <a href="/" onClick={event => handleProfileClick(event)}>이용동의 약관</a>
    </div>
  );
}

export default App;
