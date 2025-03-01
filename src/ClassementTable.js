import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';
import logo from './assets/BlueDistrib.jpg';

const ClassementTable = () => {
    const [individuData, setIndividuData] = useState([]);
    const [equipeData, setEquipeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des deux classements en parallèle
                const [individuResponse, equipeResponse] = await Promise.all([
                    axios.get("https://classement-api.onrender.com/Classement/GetClassement"),
                    axios.get("https://classement-api.onrender.com/Classement/GetClassementEquipe")
                ]);

                // Traitement classement individuel
                const sortedIndividu = individuResponse.data.sort((a, b) => b.points - a.points);
                const rankedIndividu = addRanking(sortedIndividu);
                setIndividuData(rankedIndividu);

                // Traitement classement équipe
                const sortedEquipe = equipeResponse.data.sort((a, b) => b.points - a.points);
                const rankedEquipe = addRanking(sortedEquipe);
                setEquipeData(rankedEquipe);

            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    // Fonction générique pour ajouter le classement
    const addRanking = (data) => {
        let currentRank = 1;
        let lastTotal = -1;
        return data.map((item, index) => {
            if (item.points !== lastTotal) {
                lastTotal = item.points;
                currentRank = index + 1;
            }
            return { ...item, rank: currentRank };
        });
    };

    // Composant de tableau réutilisable
    const TableauClassement = ({ titre, colonnes, donnees }) => (
        <div style={{ 
            flex: 1,
            margin: "1rem",
            background: "#dbe4e9",
            borderRadius: "15px",
            padding: "2rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
        }}>
            <h2 style={{ color: "#041526", marginBottom: "1.5rem" }}>{titre}</h2>
            
            <table style={{ width: "100%" }}>
                <thead style={{ 
                    background: "#0f2f4a",
                    color: "#dbe4e9"
                }}>
                    <tr>
                        {colonnes.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {donnees.map((item, index) => (
                        <tr 
                            key={index} 
                            style={{ 
                                background: index === 0 ? "#ffebc2" : 
                                        index === 1 ? "#f0f0f0" : 
                                        index === 2 ? "#eee4d8" : "white",
                                animation: `fadeIn 0.3s ease forwards ${index * 0.1}s`
                            }}
                        >
                            <td>
                                {item.rank === 1 ? "🥇" 
                                : item.rank === 2 ? "🥈" 
                                : item.rank === 3 ? "🥉" 
                                : item.rank}
                            </td>
                            <td>{item.nom || item.equipe}</td>
                            {colonnes.includes('Total Contrats') && <td>{item.totalContrats}</td>}
                            <td>{item.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div style={{ 
            padding: "20px", 
            fontFamily: "'Montserrat', sans-serif",
            background: "#041526",
            minHeight: "100vh"
        }}>
            {/* En-tête avec logo */}
            <div style={{ 
                textAlign: "center", 
                padding: "2rem 0",
                backgroundColor: "#041526",
                borderRadius: "0 0 30px 30px",
                marginBottom: "1rem",
                boxShadow: "0 8px 24px rgba(4, 21, 38, 0.2)"
            }}>
                <img 
                    src={logo} 
                    alt="Logo Delta Concept" 
                    style={{ 
                        width: "200px",
                        height: "auto",
                        filter: "drop-shadow(0 4px 12px rgba(219, 228, 233, 0.3))"
                    }} 
                />
            </div>
    
            {/* Contenu principal avec les deux tableaux */}
            <div style={{ 
                maxWidth: "1400px", 
                margin: "0 auto",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
            }}>
                <TableauClassement 
                    titre="Classement Individuel"
                    colonnes={['Position', 'Nom', 'Total Contrats', 'Points']}
                    donnees={individuData}
                />
                
                <TableauClassement 
                    titre="Classement par Équipe"
                    colonnes={['Position', 'Équipe', 'Points']}
                    donnees={equipeData}
                />
            </div>
        </div>
    );
};

export default ClassementTable;