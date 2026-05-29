const fs = require('fs');

const projects = [
    {
        id: 'campusbook',
        category: 'web',
        icon: 'users',
        iconColor: 'text-primary',
        gradient: 'from-indigo-950 to-dark',
        subtitle: 'Featured Web App',
        title: 'CampusBook Social Network',
        shortDesc: 'A full-fledged university life social media platform featuring dynamic React story viewer components, dynamic live chat UI, and secure database seeds.',
        tags: ['PHP', 'React', 'MySQL']
    },
    {
        id: 'flowers',
        category: 'ai',
        icon: 'flower',
        iconColor: 'text-indigo-400',
        gradient: 'from-purple-950 to-dark',
        subtitle: 'Computer Vision',
        title: 'Flower Classification',
        shortDesc: 'Machine Learning computer vision system utilizing TensorFlow neural networks to identify and classify diverse botanical classes from visual datasets.',
        tags: ['TensorFlow', 'Python', 'CV']
    },
    {
        id: 'smokers',
        category: 'web',
        icon: 'shopping-bag',
        iconColor: 'text-secondary',
        gradient: 'from-blue-950 to-dark',
        subtitle: 'E-Commerce Platform',
        title: 'Smoker\'s Hub',
        shortDesc: 'Academic web application migrating legacy pages to clean modular PHP architectures, integrating session authentications and relational catalogs.',
        tags: ['Modular PHP', 'MySQL', 'UI']
    },
    {
        id: 'heart',
        category: 'ai',
        icon: 'activity',
        iconColor: 'text-rose-400',
        gradient: 'from-rose-950 to-dark',
        subtitle: 'Health Predictor',
        title: 'Heart Disease Predictor',
        shortDesc: 'Predictive medical modeling utilizing classifications to diagnose and evaluate cardiac risks based on clinical statistics.',
        tags: ['Python', 'Pandas', 'Scikit-Learn']
    },
    {
        id: 'banking',
        category: 'systems',
        icon: 'landmark',
        iconColor: 'text-emerald-400',
        gradient: 'from-emerald-950 to-dark',
        subtitle: 'Low-Level Security',
        title: 'Banking System',
        shortDesc: 'A robust accounting application featuring solid transaction security logs, multi-tier authentications, and secure local file streams.',
        tags: ['C++', 'Assembly', 'File I/O']
    },
    {
        id: 'cpu',
        category: 'systems',
        icon: 'cpu',
        iconColor: 'text-slate-400',
        gradient: 'from-slate-800 to-dark',
        subtitle: 'COAL Simulator',
        title: 'Mini CPU Simulator',
        shortDesc: 'Simulator showing assembly execution cycles, managing instruction pipelines, programmatic index shifting, and register transformations.',
        tags: ['Assembly', 'Architecture', 'C++']
    },
    {
        id: 'spam',
        category: 'ai',
        icon: 'mail-warning',
        iconColor: 'text-orange-400',
        gradient: 'from-orange-950 to-dark',
        subtitle: 'NLP Classifier',
        title: 'Spam Classifier',
        shortDesc: 'A Natural Language Processing classification model tokenizing text streams to filter spam communications with high accuracy rates.',
        tags: ['Python', 'NLP', 'Scikit-Learn']
    }
];

let html = '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">\n';

projects.forEach(p => {
    const tagsHtml = p.tags.map(t => `<span class="px-4 py-1.5 bg-dark/5 border border-dark/10 backdrop-blur-md rounded-full text-[10px] font-black text-dark uppercase tracking-widest">${t}</span>`).join('\n                        ');
    
    html += `
            <div data-category="${p.category}" class="project-card group reveal-up flex flex-col h-full" style="display: flex;">
                <div class="relative aspect-video rounded-[3rem] overflow-hidden mb-8 shadow-premium bg-dark">
                    <div class="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6 z-20">
                        <button onclick="openModal('${p.id}')" class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-dark hover:scale-110 transition-transform shadow-glow">
                            <i data-lucide="maximize-2"></i>
                        </button>
                    </div>
                    <div class="absolute inset-0 w-full h-full flex flex-col justify-between p-8 bg-gradient-to-br ${p.gradient} z-10 transition-transform duration-700 group-hover:scale-105">
                        <i data-lucide="${p.icon}" class="w-10 h-10 ${p.iconColor}"></i>
                        <div>
                            <span class="text-[10px] uppercase tracking-widest ${p.iconColor} font-black">${p.subtitle}</span>
                            <h4 class="text-2xl font-black text-white mt-1">${p.title}</h4>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${tagsHtml}
                </div>
                <h3 class="text-2xl font-black mb-3 text-dark group-hover:text-primary transition-colors">${p.title}</h3>
                <p class="text-dark/60 text-sm font-medium leading-relaxed mb-6 flex-grow">
                    ${p.shortDesc}
                </p>
                <div class="mt-auto pt-4 border-t border-gray-100">
                    <button onclick="openModal('${p.id}')" class="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary hover:text-secondary transition-colors group/btn">
                        View Details <i data-lucide="arrow-right" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
`;
});

html += '        </div>';

fs.writeFileSync('projects_grid.html', html);
console.log('Done!');
