import Head from 'next/head'
import Layout from '@/components/Layout/Layout';
import { LoginForm } from '@/components/Form/Login_form';

export default function Login() {
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>        
            <LoginForm /> 
        </Layout>
    );
}