'use client'

import { getDoc, doc } from "firebase/firestore";
import { useFirebase } from "../firebase";
import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { set } from "firebase/database";
import './page.css';

export default function Page() {
    const [moduleData, setModuleData] = useState<any>(null);
    const firebase = useFirebase();
    const firestore = firebase.firestore;

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(firestore, "modules", "XdPbKE2Lns2aaMariwoF");
            const moduleDoc = await getDoc(docRef);
            let data = moduleDoc.data()
            let s = !data ? '' : data.content;
            s = s.replace(/<br>/g, '\n');
            if (data) data.content = s;
            console.log(s)
            setModuleData(data);
            console.log(moduleData)
        };
        fetchData();
    }, [firestore]);

    return <>
        <div>
            <h1>Page</h1>
            <p>Page content</p>

            <div className="prose prose-lg prose-indigo">

            {moduleData && <MarkdownRenderer content={moduleData.content} />}
            </div>
        </div>
    </>
}