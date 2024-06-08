import React from "react";
import parse from 'html-react-parser'




export default function Replies({ children, isChild  }) {
    return (<>
        {Object.entries(children).map(([k, v]) => {
            const { body, body_html, replies, author } = v.data
            let bodyFixed =  body
            if (body_html){
                let parsed_body = parse(body_html)
                const links = parsed_body.match(/<a.*\/a>/gm)
                
                if(links)(links.forEach((link)=>{
                    
                    if(link.match(/<a href="https:\/\/preview\.redd\.it/gm)){
                        
                        const image=link.replace(/<a href="https:\/\/preview\.redd\.it/gm,'<img class="reply-image" src="https://preview.redd.it')
                        .replace(/>.*<\/a>/,' />')
                        console.log(link)
                        parsed_body +=image;
                    }
                }))
                bodyFixed =parse(parsed_body);
            } 
            

            if (author) {

                return (
                    <div key={v.data.id} className={isChild?"reply":"reply reply-first"}>
                        <p className='author'>{author}:</p>
                        <div className='reply-body'> {bodyFixed}</div>
                        {replies ? <Replies  children={replies.data.children} isChild={true}/> : ""}
                    </div>
                )
            }
            else { return <></> };
        })}

    </>)
}