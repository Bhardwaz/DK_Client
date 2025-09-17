import React from 'react'
import { useDispatch } from 'react-redux'
import { pushActionsThunk } from './requestSlice'

const RequestCard = ({id, firstName, lastName, age, photoUrl, about, gender, skills }) => {
  const dispatch = useDispatch()

  const actionOnRequests = (action, targetUserId) => {
       dispatch(pushActionsThunk(action, targetUserId))
  }

  return (
   <li className="list-row">
    <div><img className="size-10 rounded-box" src={photoUrl} /></div>
    <div>
      <div>{firstName} { lastName }</div>
      {
      skills?.length > 0 ? skills.map((skill, index ) => 
      {
      return <span key={index} className="text-xs uppercase font-semibold opacity-60">
            {skill} { index !== skills.length - 1 ? <span> &middot; </span> : null}
      </span>
      }
      )
      : null
      }
      <div className="text-xs uppercase font-semibold opacity-60">
        {age}
          <span> &middot; </span>
        {gender}
      </div>
    </div>
    <p className="list-col-wrap text-xs">
      { about }
    </p>
    <button
    className="btn btn-success btn-square shadow-md hover:shadow-lg active:scale-95 transition-transform duration-150"
    aria-label="Accept"
    onClick={() => actionOnRequests('accepted', id)}
  >
    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
        <path d="M5 13l4 4L19 7" />
      </g>
    </svg>
  </button>

  {/* Reject Button */}
  <button
    className="btn btn-error btn-square shadow-md hover:shadow-lg active:scale-95 transition-transform duration-150"
    aria-label="Reject"
    onClick={() => actionOnRequests('rejected', id)}
  >
    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
        <path d="M6 18L18 6M6 6l12 12" />
      </g>
    </svg>
  </button>
  </li>
  )
}

export default RequestCard