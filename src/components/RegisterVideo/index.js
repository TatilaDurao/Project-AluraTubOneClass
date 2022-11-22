import React from "react"
import { StyledRegisterVideo } from "./styles"
import { createClient } from '@supabase/supabase-js'

function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    
    return{
        values,
        handleChange: (evento)=>{
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            })
            },
        clearForm(){
            setValues({})
        }    
    }
}

const supabaseUrl = 'https://rhlbiblqwztevviyvtgr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJobGJpYmxxd3p0ZXZ2aXl2dGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkwNTM4MjgsImV4cCI6MTk4NDYyOTgyOH0.OpgbmgKde21qkK2ZGLGIIPmjqNba1ei1JzUwwhkfVfc"   
const supabase = createClient(supabaseUrl, supabaseKey)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {titulo: "", url: ""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
    

    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel 
                ?(
                    <form onSubmit={(evento)=>{
                        evento.preventDefault(); //não recarrega mais a pagina ao fazer um onchange
                        supabase.from("video").insert({
                            title:formCadastro.values.titulo,
                            url: formCadastro.values.url ,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos" , 
                        })
                        .then((oqueveio)=>{
                            console.log(oqueveio)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                    <div>
                        <button type="button" className="close-modal" onClick={()=> {setFormVisivel(false), formCadastro.clearForm()}}>x</button>
                        <input 
                            placeholder="Titulo do Video" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}
                        ></input>
                            

                        <input 
                            placeholder="URL" 
                            name="url"
                            value={formCadastro.values.url} 
                            onChange={formCadastro.handleChange}
                        ></input>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
                )
                : null
            }
            
        </StyledRegisterVideo>
    )
}