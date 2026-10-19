// App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';

// ── Catalogue Santa Lucia (prix indicatifs FCFA) ──────────────────────────
const ARTICLES = [
  { id: 1,  nom: 'Baguette de pain (200g)',        categorie: 'Boulangerie', prix: 125  },
  { id: 2,  nom: 'Croissant au beurre',             categorie: 'Boulangerie', prix: 150  },
  { id: 3,  nom: 'Lait en poudre 900g',             categorie: 'Épicerie',    prix: 4200 },
  { id: 4,  nom: 'Riz parfumé 5kg',                 categorie: 'Épicerie',    prix: 4500 },
  { id: 5,  nom: 'Huile raffinée 1L',               categorie: 'Épicerie',    prix: 1200 },
  { id: 6,  nom: 'Sucre en morceaux 1kg',           categorie: 'Épicerie',    prix: 900  },
  { id: 7,  nom: 'Pâtes spaghetti 500g',            categorie: 'Épicerie',    prix: 450  },
  { id: 8,  nom: 'Savon de toilette 250g',          categorie: 'Hygiène',     prix: 800  },
  { id: 9,  nom: 'Gel douche 500ml',                categorie: 'Hygiène',     prix: 2500 },
  { id: 10, nom: 'Détergent liquide 3L',            categorie: 'Maison',      prix: 8500 },
  { id: 11, nom: 'Boîte de rangement',              categorie: 'Maison',      prix: 1500 },
  { id: 12, nom: 'Eau minérale 1,5L',               categorie: 'Boissons',    prix: 400  },
  { id: 13, nom: 'Jus d\'orange 1L',                categorie: 'Boissons',    prix: 1200 },
  { id: 14, nom: 'Bière locale (canette 33cl)',     categorie: 'Boissons',    prix: 750  },
];

const CATEGORIES = [...new Set(ARTICLES.map(a => a.categorie))];
const TVA_TAUX = 0.1925; // 19,25 % Cameroun [citation:2][citation:8]

// ── Contexte panier ────────────────────────────────────────────────────────
function usePanier() {
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

// ── Page de saisie ─────────────────────────────────────────────────────────
function SaisiePage({ panier }) {
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState('Toutes');
  const [articleId, setArticleId] = useState('');
  const [quantite, setQuantite] = useState(1);

  const articlesFiltres = categorie === 'Toutes'
    ? ARTICLES
    : ARTICLES.filter(a => a.categorie === categorie);

  const articleSelectionne = ARTICLES.find(a => a.id === Number(articleId));

  const handleAjouter = (e) => {
    e.preventDefault();
    if (!articleSelectionne || quantite < 1) return;
    panier.ajouter(articleSelectionne, quantite);
    setArticleId('');
    setQuantite(1);
  };

  return (
    <div className="page saisie">
      <header className="entete">
        <h1>🛒 Santa Lucia — Caisse</h1>
        <nav>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'actif' : ''}>
            Saisie
          </NavLink>
        </nav>
      </header>

      <div className="contenu-principal">
        {/* Formulaire */}
        <section className="formulaire">
          <h2>Ajouter un article</h2>

          <div className="filtre">
            <label>Filtrer par catégorie</label>
            <select value={categorie} onChange={e => setCategorie(e.target.value)}>
              <option value="Toutes">Toutes</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <form onSubmit={handleAjouter}>
            <div className="champ">
              <label>Article</label>
              <select
                value={articleId}
                onChange={e => setArticleId(e.target.value)}
                required
              >
                <option value="">— Sélectionner —</option>
                {articlesFiltres.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.nom} — {a.prix.toLocaleString('fr-FR')} FCFA
                  </option>
                ))}
              </select>
            </div>

            <div className="champ">
              <label>Quantité</label>
              <input
                type="number"
                min="1"
                value={quantite}
                onChange={e => setQuantite(Number(e.target.value))}
                required
              />
            </div>

            {articleSelectionne && (
              <p className="apercu">
                Sous-total : <strong>{(articleSelectionne.prix * quantite).toLocaleString('fr-FR')} FCFA</strong>
              </p>
            )}

            <button type="submit" className="btn-ajouter">
              + Ajouter au panier
            </button>
          </form>
        </section>

        {/* Aside panier */}
        <aside className="panier">
          <h2>Panier ({panier.lignes.length})</h2>

          {panier.lignes.length === 0 ? (
            <p className="vide">Aucun article ajouté.</p>
          ) : (
            <>
              <ul className="liste-panier">
                {panier.lignes.map(l => (
                  <li key={l.article.id}>
                    <div className="info">
                      <span className="nom">{l.article.nom}</span>
                      <span className="detail">
                        {l.quantite} × {l.article.prix.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                    <div className="actions">
                      <strong>{(l.article.prix * l.quantite).toLocaleString('fr-FR')} F</strong>
                      <button
                        className="btn-suppr"
                        onClick={() => panier.supprimer(l.article.id)}
                        title="Retirer"
                      >✕</button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="totaux">
                <div><span>Total HT</span><span>{panier.totalHT.toLocaleString('fr-FR')} FCFA</span></div>
                <div><span>TVA (19,25 %)</span><span>{panier.tva.toLocaleString('fr-FR')} FCFA</span></div>
                <div className="ttc"><span>Total TTC</span><span>{panier.totalTTC.toLocaleString('fr-FR')} FCFA</span></div>
              </div>

              <button
                className="btn-facture"
                onClick={() => navigate('/invoice')}
              >
                Créer la facture →
              </button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

// ── Page Facture ───────────────────────────────────────────────────────────
function InvoicePage({ panier }) {
  const navigate = useNavigate();
  const [rembourse, setRembourse] = useState(false);
  const [numeroFacture] = useState(() =>
    'SL-' + Date.now().toString().slice(-8)
  );

  const remboursementSimule = panier.totalTTC * 0.05; // simulation 5 %

  const handleRembourser = () => {
    setRembourse(true);
  };

  if (panier.lignes.length === 0) {
    return (
      <div className="page invoice">
        <header className="entete">
          <h1>Facture</h1>
          <nav>
            <NavLink to="/" className={({ isActive }) => isActive ? 'actif' : ''}>
              ← Retour caisse
            </NavLink>
          </nav>
        </header>
        <p className="vide">Aucun article dans le panier.</p>
      </div>
    );
  }

  return (
    <div className="page invoice">
      <header className="entete">
        <h1>Facture</h1>
        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? 'actif' : ''}>
            ← Nouvelle vente
          </NavLink>
        </nav>
      </header>

      <div className="facture-boite">
        <div className="facture-entete">
          <div>
            <h2>Santa Lucia Cameroun</h2>
            <p>Yaoundé / Douala — Cameroun</p>
          </div>
          <div className="facture-meta">
            <p><strong>N° {numeroFacture}</strong></p>
            <p>{new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>

        <table className="table-facture">
          <thead>
            <tr>
              <th>Article</th>
              <th>Qté</th>
              <th>Prix unit.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {panier.lignes.map(l => (
              <tr key={l.article.id}>
                <td>{l.article.nom}</td>
                <td>{l.quantite}</td>
                <td>{l.article.prix.toLocaleString('fr-FR')} F</td>
                <td>{(l.article.prix * l.quantite).toLocaleString('fr-FR')} F</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="facture-totaux">
          <div><span>Total HT</span><span>{panier.totalHT.toLocaleString('fr-FR')} FCFA</span></div>
          <div><span>TVA (19,25 %)</span><span>{panier.tva.toLocaleString('fr-FR')} FCFA</span></div>
          <div className="ttc"><span>Total TTC</span><span>{panier.totalTTC.toLocaleString('fr-FR')} FCFA</span></div>
        </div>

        {/* Simulation remboursement */}
        <div className="remboursement">
          <h3>Simulation de remboursement</h3>
          <p>
            Montant éligible simulé (5 % du TTC) :{' '}
            <strong>{remboursementSimule.toLocaleString('fr-FR')} FCFA</strong>
          </p>

          {rembourse ? (
            <div className="rembourse-ok">
              ✅ Remboursement simulé effectué. Le client recevra{' '}
              <strong>{remboursementSimule.toLocaleString('fr-FR')} FCFA</strong>.
            </div>
          ) : (
            <button className="btn-rembourser" onClick={handleRembourser}>
              Simuler le remboursement
            </button>
          )}
        </div>

        <div className="facture-pied">
          <p>Merci de votre visite chez Santa Lucia !</p>
          <button className="btn-retour" onClick={() => navigate('/')}>
            ← Retour à la caisse
          </button>
        </div>
      </div>
    </div>
  );
}

// ── App racine ─────────────────────────────────────────────────────────────
export default function App() {
  const panier = usePanier();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SaisiePage panier={panier} />} />
        <Route path="/invoice" element={<InvoicePage panier={panier} />} />
      </Routes>
    </BrowserRouter>
  );
}