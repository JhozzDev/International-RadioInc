
type Props = {
  info: any;
};

export default function CultureBox({info}: Props){
  
    if (!info) return null;
    
    return(
        <div className="w-36flex flex-col border-purple-400">
        <p>Sabias que en {info.nombre}</p>
        <p>Una frase comun es "{info.frase}"</p>
        </div>
    )
}