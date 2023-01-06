import React from 'react'
import { Table } from 'react-bootstrap'

export default function Editor({value}) {
  return (
    <div>  
        {value?.blocks?.length > 0 && value.blocks.map((block) => {
            if(block.type === 'paragraph'){
                return <p className='article-para' dangerouslySetInnerHTML={{__html: block.data.text}}></p>
            }
            else if(block.type === 'header'){
                return <div dangerouslySetInnerHTML={{__html: `<h${block.data.level}>${block.data.text}</h${block.data.level}>`}}></div>
            }
            else if(block.type === 'image'){
                return <div dangerouslySetInnerHTML={{__html: `<figure class="figure mb-4 mt-3 ${block.data.withBackground && 'bg-gray-100 p-5'}">
                    <img src="${block.data.file.url}" alt="${block.data.caption || "Image"}" class="figure-img img-fluid w-100">
                    <figcaption class="figure-caption text-sm text-muted">${block.data.caption}</figcaption>
                </figure>`}}></div>
                
            }
            else if(block.type === 'list'){
                if(block.data.style === 'ordered'){
                    return <ol>
                        {block.data.items.map(item => <li className='article-para' dangerouslySetInnerHTML={{__html: item}}></li>)}
                    </ol>
                }
                else return <ul>
                    {block.data.items.map(item => <li className='article-para' dangerouslySetInnerHTML={{__html: item}}></li>)}
                </ul>
            }
            else if(block.type === 'table'){
                return <Table className="text-sm border">
                    <tbody>
                    {block.data.content.map((row, index) => (
                        <tr key={index}>
                        {row.map(((item, i) => <td
                            className={`fw-normal ${(index === 0 && block.data.withHeadings) && 'fw-bold'}`}
                            key={i}
                        >
                            {item}
                        </td>))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            }
            else if(block.type === 'quote'){
                return <div className={'p-4 bg-gray-100 text-' + block.data.alignment }>
                   <p className='h5 mb-2 fw-bold text-muted'> <i dangerouslySetInnerHTML={{__html: block.data.text}}></i></p>
                    {block.data.caption && <span>- {block?.data?.caption}</span>}
                </div>
            }
            else if(block.type === 'raw'){
                return <div dangerouslySetInnerHTML={{__html: block.data.html}}></div>
            }
            else if(block.type === 'delimiter'){
                return <div className='p-4 fw-bold h2 text-center'>***</div>
            }
            
        })}
    </div>
  )
}
