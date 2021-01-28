import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { MessageBus } from '../Modules/MessageBus'

export const Home = () => {
    
    useEffect(()=>{
        MessageBus.on('BUTTON_CLICK_EVENT', eventHandler)
    })
    return(
        <div>
            <Button variant="contained" onClick={MessageBus.trigger('BUTTON_CLICK_EVENT','button1')}>Trigger event 1</Button><br/><br/>
            <Button variant="contained" onClick={MessageBus.trigger('BUTTON_CLICK_EVENT','button2')}>Trigger event 2</Button>
            <p>Event triggered from {}</p>
        </div>
    )
}