import React from "react"
import { StyledRegisterVideo } from "./styles"

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