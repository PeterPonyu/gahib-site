export type DatasetCategory = {
  name: string;
  description: string;
  datasets: string[];
};

export type DatasetDomain = {
  name: string;
  count: number;
  description: string;
  categories: DatasetCategory[];
};

export type MetricItem = {
  name: string;
  direction: 'higher' | 'lower' | 'diagnostic';
  description: string;
};

export type MetricGroup = {
  name: string;
  count: number;
  description: string;
  metrics: MetricItem[];
};

export type BenchmarkFamily = {
  name: string;
  count: number;
  purpose: string;
  methods: string[];
};

export const studyScale = [
  { label: 'Datasets', value: '53', detail: '27 cancer and 26 development cohorts' },
  { label: 'Study tracks', value: '11', detail: '7 comparative, 4 robustness and efficiency' },
  { label: 'Metrics', value: '20', detail: 'clustering, DRE, and LSE families' },
  { label: 'Primary latent', value: '10D', detail: 'shared dimensionality for learned methods' },
] as const;

export const datasetDomains: DatasetDomain[] = [
  {
    name: 'Cancer',
    count: 27,
    description:
      'Primary tumors, blood malignancies, metastasis samples, and cancer immune contexts.',
    categories: [
      {
        name: 'Skin carcinoma',
        description: 'Basal and squamous cell carcinoma cohorts.',
        datasets: ['GSE123813_bccHmCancer', 'GSE123813_sccHmCancer'],
      },
      {
        name: 'Breast cancer',
        description: 'Epithelial, stromal, primary, and metastatic breast cancer datasets.',
        datasets: [
          'GSE155109_bcECHmCancer',
          'GSE155109_bcStromaHmCancer',
          'GSE225600_breast_CancerHm',
          'GSE262288_breastMetasisHmCancer',
          'GSE168181_BreastHmCancer',
          'GSE228499_breastHmCancer',
        ],
      },
      {
        name: 'Liver and metastasis',
        description: 'Liver cancer, liver metastasis, and hepatoblastoma-related cohorts.',
        datasets: [
          'GSE98638_TcellLiverHmCancer',
          'GSE138709_LiverCancer',
          'GSE225857_liverColonMetasisHmCancer',
          'GSE283205_hepatoblastomaCancer',
        ],
      },
      {
        name: 'Blood and lymphoid malignancy',
        description: 'AML, ALL, multiple myeloma, and lymphoma contexts.',
        datasets: [
          'GSE132509_acutelymluekPBMCHmCancer',
          'GSE148218_bmALLHmCancer',
          'GSE222369_NKsLymphomaHmCancer',
          'GSE235787_bcellsALLHmCancer',
          'GSE124310_MMHmCancer',
        ],
      },
      {
        name: 'GI tract',
        description: 'Gastric, stomach, and colorectal adenocarcinoma contexts.',
        datasets: [
          'GSE183904_GastricHmCancer',
          'GSE149655_CAHmCancer',
          'GSE163558_stomachHmCancer',
        ],
      },
      {
        name: 'Lung adenocarcinoma',
        description: 'Two lung adenocarcinoma cohorts.',
        datasets: ['GSE123902_LungAdreHmCancer', 'GSE189357_lungAdreHmCancer'],
      },
      {
        name: 'Brain metastasis',
        description: 'Liver and triple-negative breast cancer brain-metastasis cohorts.',
        datasets: ['GSE143423_lbm_CancerBrainHm', 'GSE143423_tnbc_CancerBrainHm'],
      },
      {
        name: 'Merkel cell carcinoma',
        description: 'PBMC and tumor sampling contexts for Merkel cell carcinoma.',
        datasets: ['GSE117988_MCCPBMCCancer', 'GSE117988_MCCTumorCancer'],
      },
      {
        name: 'T-cell cancers',
        description: 'T-cell cancer immune-state dataset.',
        datasets: ['GSE222002_TcellsHmCancer'],
      },
    ],
  },
  {
    name: 'Development',
    count: 26,
    description:
      'Hematopoietic, neural, embryonic, organ-development, disease-model, and atlas-scale systems.',
    categories: [
      {
        name: 'Hematopoiesis',
        description: 'CD34+ progenitors, HSC aging, bone marrow niche, and immune differentiation.',
        datasets: [
          'setty',
          'hemato',
          'bm_GSE120446',
          'GSE253355_bmNicheHm',
          'GSE226131_HSCMmAged',
          'GSE165844_LSKMmBatch',
          'GSE120505_bloodAged',
          'ifnHSPC_GSE226824',
        ],
      },
      {
        name: 'Neural development',
        description: 'Dentate gyrus, spinal cord, retina, and astrocyte lineage contexts.',
        datasets: [
          'dentate',
          'GSE167597_spineMm',
          'GSE165784_RetinaHmDev',
          'GSE189070_astrocytesSCIMmDev',
        ],
      },
      {
        name: 'Embryonic and stem-cell systems',
        description: 'hESC time series, hESC-HSPC differentiation, and endoderm states.',
        datasets: [
          'GSE148215_hESCHSPCD8Hm',
          'GSE192857_hESCHmTimes',
          'hESC_GSE144024',
          'endo',
        ],
      },
      {
        name: 'Organ development',
        description: 'Lung, pituitary, progastrin, urinary, and tooth development systems.',
        datasets: [
          'lung',
          'GSE130148_LungHmDev',
          'GSE142653pitHmDev',
          'GSE145929_ProgastinMmDev',
          'GSE145929_UrineMmDev',
          'GSE275119_TeethMmDev',
        ],
      },
      {
        name: 'Disease models',
        description: 'Inflammatory response and Alzheimer disease model contexts.',
        datasets: ['GSE115571_LPSMmDev', 'GSE213740_ADHm'],
      },
      {
        name: 'Atlas references',
        description: 'PanSci muscle and T-cell atlas-scale references.',
        datasets: ['GSE247719_PanSci_05_Muscle_adata', 'GSE247719_PanSci_T_cell_adata'],
      },
    ],
  },
];


export const preprocessingWorkflow = [
  'Library-size normalization to 10,000 counts per cell',
  'log1p transform and selection of 2,000 highly variable genes',
  'Subsample to at most 3,000 cells with seed 42',
  'Leiden clustering at resolution 1.0 as the unsupervised reference partition',
  'Identical 15-nearest-neighbor graph and train-validation split for compared methods',
] as const;

export const metricGroups: MetricGroup[] = [
  {
    name: 'Clustering quality',
    count: 6,
    description:
      'Agreement and separation of K-means clusters in latent space against the Leiden reference partition.',
    metrics: [
      { name: 'NMI', direction: 'higher', description: 'Normalized mutual information for partition agreement.' },
      { name: 'ARI', direction: 'higher', description: 'Adjusted Rand index with chance correction.' },
      { name: 'ASW', direction: 'higher', description: 'Average silhouette width for intra- versus inter-cluster distance.' },
      { name: 'DAV', direction: 'lower', description: 'Davies-Bouldin index; lower values indicate less cluster overlap.' },
      { name: 'CAL', direction: 'higher', description: 'Calinski-Harabasz score for compact, well-separated clusters.' },
      { name: 'COR', direction: 'diagnostic', description: 'Mean absolute inter-dimensional Pearson correlation in the latent space.' },
    ],
  },
  {
    name: 'Dimensionality reduction evaluation',
    count: 8,
    description:
      'Co-ranking evaluation of how UMAP and t-SNE projections preserve neighborhoods from the learned latent space.',
    metrics: [
      { name: 'UMAP distance correlation', direction: 'higher', description: 'Rank-distance agreement for UMAP projections.' },
      { name: 'UMAP Q_local', direction: 'higher', description: 'Local nearest-neighbor preservation at k = 15.' },
      { name: 'UMAP Q_global', direction: 'higher', description: 'Global structure preservation in the projection.' },
      { name: 'UMAP overall', direction: 'higher', description: 'Combined local and global UMAP quality.' },
      { name: 't-SNE distance correlation', direction: 'higher', description: 'Rank-distance agreement for t-SNE projections.' },
      { name: 't-SNE Q_local', direction: 'higher', description: 'Local nearest-neighbor preservation at k = 15.' },
      { name: 't-SNE Q_global', direction: 'higher', description: 'Global structure preservation in the projection.' },
      { name: 't-SNE overall', direction: 'higher', description: 'Combined local and global t-SNE quality.' },
    ],
  },
  {
    name: 'Latent space evaluation',
    count: 6,
    description:
      'Intrinsic spectral and geometric diagnostics for the latent representation before 2-D plotting.',
    metrics: [
      { name: 'Manifold dimensionality', direction: 'diagnostic', description: 'Intrinsic dimension estimate from the PCA eigenvalue spectrum.' },
      { name: 'Spectral decay', direction: 'diagnostic', description: 'Slope of the sorted eigenvalue curve.' },
      { name: 'Participation ratio', direction: 'higher', description: 'Effective number of active latent dimensions.' },
      { name: 'Anisotropy', direction: 'diagnostic', description: 'Directional spread uniformity across the latent axes.' },
      { name: 'Noise resilience', direction: 'higher', description: 'Embedding stability under Gaussian perturbation.' },
      { name: 'LSE overall', direction: 'higher', description: 'Composite of normalized latent-space diagnostic scores.' },
    ],
  },
];

export const statisticalTestingNotes = [
  'Two-sided Wilcoxon signed-rank tests compare paired method outputs across the same datasets.',
  'Benjamini-Hochberg FDR correction is applied within each results table at q = 0.05.',
  'All comparisons use the same preprocessing pipeline and a fixed random seed where subsampling is needed.',
] as const;

export const benchmarkFamilies: BenchmarkFamily[] = [
  {
    name: 'Component ablation',
    count: 5,
    purpose: 'Isolates the contributions of information bottleneck, Lorentz geometry, and graph attention.',
    methods: ['Base VAE', 'VAE + IB', 'VAE + Hyp', 'VAE + IB + Hyp', 'GAHIB'],
  },
  {
    name: 'Deep-learning benchmark',
    count: 8,
    purpose: 'Compares GAHIB with published single-cell deep representation methods under the same pipeline.',
    methods: ['GAHIB', 'scVI', 'CellBLAST', 'CLEAR', 'SCALEX', 'scDeepCluster', 'scDHMap', 'scGNN'],
  },
  {
    name: 'Classical dimensionality reduction',
    count: 6,
    purpose: 'Contrasts learned graph-hyperbolic representations with standard linear and nonlinear decompositions.',
    methods: ['GAHIB', 'PCA', 'ICA', 'NMF', 'Truncated SVD', 'Diffusion Maps'],
  },
  {
    name: 'Geometric VAE benchmark',
    count: 6,
    purpose: 'Tests whether hyperbolic priors alone match the graph-attention bottleneck formulation.',
    methods: ['GAHIB', 'GM-VAE Euclidean', 'GM-VAE Poincare', 'GM-VAE PGM', 'GM-VAE Learnable PGM', 'GM-VAE Hyperbolic-Wasserstein'],
  },
  {
    name: 'Disentanglement regularization',
    count: 6,
    purpose: 'Compares structural geometry against posterior regularizers used for disentangled VAEs.',
    methods: ['GAHIB', 'Base VAE', 'Beta-VAE', 'DIP-VAE', 'Beta-TC-VAE', 'InfoVAE'],
  },
  {
    name: 'Encoder architecture comparison',
    count: 3,
    purpose: 'Fixes the GAHIB objective and varies only the encoder family.',
    methods: ['MLP', 'Transformer', 'GAT'],
  },
  {
    name: 'Graph convolution operator sweep',
    count: 6,
    purpose: 'Compares message-passing operators within the GAHIB graph encoder setting.',
    methods: ['GCN', 'GraphSAGE', 'Chebyshev', 'TAG', 'GraphTransformer', 'GAT'],
  },
  {
    name: 'Robustness and efficiency studies',
    count: 4,
    purpose: 'Measures sensitivity to latent dimension, random seed, hyperparameters, and computational cost.',
    methods: ['Latent dimension ablation', 'Seed robustness', 'Hyperparameter sensitivity', 'Computational cost'],
  },
];
