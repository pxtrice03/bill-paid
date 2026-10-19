import { useState } from "react";
import supermarket from "@/data/supermarket";

const useCart = () => {
    const [lignes, setLignes] = useState([]);

    const ajouter = (article, quantite) => {
        setLignes(prev => {
            const existante = prev.find(l => l.article.id === article.id);
            if (existante) {
                return prev.map(l =>
                l.article.id === article.id
                    ? { ...l, quantite: l.quantite + quantite }
                    : l
                );
            }
            return [...prev, { article, quantite }];
        });
    };

    const supprimer = (id) => setLignes(prev => prev.filter(l => l.article.id !== id));

    const totalHT = lignes.reduce((s, l) => s + l.article.prix * l.quantite, 0);
    const tva      = totalHT * TVA_TAUX;
    const totalTTC = totalHT + tva;

    return { lignes, ajouter, supprimer, totalHT, tva, totalTTC };
}

export default useCart