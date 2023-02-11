import Head from 'next/head'
import Layout from '@/src/components/layout/layout';
import { LoginForm } from '@/components/Form/login_form';

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