import Head from 'next/head'
import { Guest } from '@/components/Home/Guest'
import { User } from '@/components/Home/User'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';


export default function Home() {
  const router = useRouter();
  const session = Cookies.get('username');

  function handleSignOut(){
    Cookies.remove('username');
    
    router.push('/login');
  }

  return (
    <Layout>
        <Head>
            <title>Home</title>
        </Head>        
        {session!=null ? User({session, handleSignOut}) : Guest()} 
    </Layout>
  )
}