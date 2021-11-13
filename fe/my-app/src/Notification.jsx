import { useState, useEffect } from 'react';
import IconFont from "./iconFont";

const Notification = ({oneNote}) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }

  return (
    <div className={"notification " + oneNote.type} >
      {oneNote.type === 'success' ? <IconFont type={"icon-success-fill"}/> : <IconFont type={"icon-error"}/>}
      {oneNote.message}
    </div>
  )
}

export default Notification