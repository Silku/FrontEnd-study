import SEO from '@/components/SEO';
import { useRouter } from 'next/router'


const Detail = ({params}) => {
    const router = useRouter();
    console.log(router)
    const [title, id, img] = params || [];
    return (
        <>
            <SEO title={title} />
            <h4>{title}</h4>
            <img src={`https://image.tmdb.org/t/p/w500/${img}`}/>
        </>
    )
}

export default Detail;

export function getServerSideProps({ params: { params } }) {
    return {
        props: {
            params,
        },
    };
}