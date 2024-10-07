import React from 'react'
import GlobalNotificationSystem from '../usecontext/GlobalNotificationSystem'
import DynamicTheme from '../usecontext/DynamicTheme'
import GlobalState from '../usecontext/GlobalState'
import Authorization from '../usecontext/Authorization'
import RealTimeChat from '../usecontext/RealTimeChat'

function UseContext() {
  return (
    <div>
      <GlobalNotificationSystem />
       <Authorization />
       <GlobalState />
       <RealTimeChat />
       <DynamicTheme />
    </div>
  )
}

export default UseContext;
