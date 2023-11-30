import React from "react";
import parse from 'html-react-parser'



export default function Replies({children}){
    return (<>
        <p>{Object.entries(children).map(([k,v])=>{
            const {body, body_html, replies,author} = v.data
            const bodyFixed =body_html?parse(parse(body_html)):body

            if (author) {
            return(
            <div key = {k} className="reply">
                <p className='author'>{author}:</p>
                <p className='reply-body'> {bodyFixed}</p>
                {replies?<Replies key={k} children={replies.data.children} />:""}
            </div>
            )}
            else {return <></>};
            })}
        </p>
    </>)
}