// Team Page — layout, cards, and interactions

const TEAM_DATA = {
    president: {
        name: 'Keshava Olagappaa Subramanian',
        role: 'President',
        department: 'Executives',
        photo: 'static/images/team/keshava.png',
        linkedin: 'https://www.linkedin.com/in/keshava-olagappaa/',
        bio: 'Passionate about organizing impactful events that help students develop essential career skills.',
        hobby: 'I love hosting events and drinking Matcha!'
    },
    vicePresident: {
        name: 'Bao Nguyen',
        role: 'Vice President',
        department: 'Executives',
        photo: 'static/images/team/bao.jpg',
        linkedin: 'https://www.linkedin.com/in/quocnguyen-2203asu/',
        bio: 'Focused on building partnerships and scaling GCN\'s impact across campus and industry.',
        hobby: 'Playing basketball and discovering new ramen spots around Phoenix.'
    },
    departments: [
        {
            name: 'Operations',
            members: [
                {
                    name: 'Henry Tran',
                    role: 'Officer',
                    photo: 'static/images/team/henry.jpg',
                    linkedin: 'https://www.linkedin.com/in/nhattran0812/',
                    bio: 'Keeps events running smoothly — from logistics to day-of coordination.',
                    hobby: 'Photography and late-night boba runs.'
                },
                {
                    name: 'Angel Rosas',
                    role: 'Team Lead',
                    photo: 'static/images/team/angel.jpg',
                    linkedin: 'https://www.linkedin.com/in/angel-e-rosas/',
                    bio: 'Leads operations planning and ensures every GCN event delivers a seamless experience.',
                    hobby: 'Hiking Arizona trails and trying new coffee shops.'
                },
                {
                    name: 'Mahi Brahmbhatt',
                    role: 'Intern',
                    photo: 'static/images/team/mahi.png',
                    linkedin: 'https://www.linkedin.com/in/mahi-brahmbhatt/',
                    bio: 'Supports event logistics and helps coordinate behind-the-scenes operations.',
                    hobby: 'Cooking fusion recipes and binge-watching documentaries.'
                }
            ]
        },
        {
            name: 'Outreach',
            members: [
                {
                    name: 'Tanu Magesh',
                    role: 'Team Lead',
                    photo: 'static/images/team/tanu.jpeg',
                    linkedin: 'https://www.linkedin.com/in/tanushri-magesh-sowmya-592bb42b6/',
                    bio: 'Builds relationships with companies and expands GCN\'s professional network.',
                    hobby: 'Dancing and exploring international food festivals.'
                },
                {
                    name: 'Vishnu Uppalapati',
                    role: 'Intern',
                    photo: 'static/images/team/vishnu.jpeg',
                    linkedin: 'https://www.linkedin.com/in/vishnu-uppalapati/',
                    bio: 'Connects students with recruiters and supports corporate outreach initiatives.',
                    hobby: 'Cricket, chess, and learning new languages.'
                },
                {
                    name: 'Harshith Vijayan',
                    role: 'Intern',
                    photo: 'static/images/team/harshith.jpg',
                    linkedin: 'https://www.linkedin.com/in/harshith-vijayan-b36229326/',
                    bio: 'Helps manage outreach campaigns and grow GCN\'s presence on campus.',
                    hobby: 'Gaming, music production, and weekend road trips.'
                }
            ]
        },
        {
            name: 'Technical',
            members: [
                {
                    name: 'Pushkar Prasad',
                    role: 'Team Lead',
                    photo: 'static/images/team/pushkar.jpeg',
                    linkedin: 'https://www.linkedin.com/in/pushkar1008/',
                    bio: 'Oversees GCN\'s digital presence, website, and technical infrastructure.',
                    hobby: 'Building side projects and exploring new web technologies.'
                },
                {
                    name: 'Anhiti Vooturi',
                    role: 'Intern',
                    photo: 'static/images/team/anhiti.jpeg',
                    linkedin: 'https://www.linkedin.com/in/anhiti-vooturi-9892a7256/',
                    bio: 'Supports website development and digital tools for the organization.',
                    hobby: 'Sketching, journaling, and trying every matcha latte in Tempe.'
                }
            ]
        },
        {
            name: 'Finance',
            members: [
                {
                    name: 'Kendra (Pham) Do',
                    role: 'Team Lead',
                    photo: 'static/images/team/kendra.jpg',
                    linkedin: '',
                    bio: 'Manages budgets, sponsorships, and financial planning for all GCN initiatives.',
                    hobby: 'Personal finance podcasts and weekend farmers markets.'
                },
                {
                    name: 'Harry Yuan',
                    role: 'Intern',
                    photo: 'static/images/team/harry.png',
                    linkedin: 'https://www.linkedin.com/in/cheng-hsi/',
                    bio: 'Tracks expenses and supports sponsorship and fundraising efforts.',
                    hobby: 'Stock market research and playing the piano.'
                }
            ]
        },
        {
            name: 'Marketing',
            members: [
                {
                    name: 'Daksh Raghav',
                    role: 'Team Lead',
                    photo: 'static/images/team/daksh.jpg',
                    linkedin: 'https://www.linkedin.com/in/dakshraghav/',
                    bio: 'Drives GCN\'s brand, social media strategy, and campus visibility.',
                    hobby: 'Content creation, graphic design, and film photography.'
                },
                {
                    name: 'Jennifer Phan',
                    role: 'Intern',
                    photo: 'static/images/team/jennifer.jpg',
                    linkedin: '',
                    bio: 'Creates engaging content and supports marketing campaigns across platforms.',
                    hobby: 'Digital art, K-pop, and exploring new cafes.'
                }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    renderTeamPage();
    initializeTeamCards();
});

function createTeamCard(member, options = {}) {
    const { isExecutive = false, delay = 0 } = options;
    const linkedinHtml = member.linkedin
        ? `<a href="${member.linkedin}" class="team-card-linkedin" target="_blank" rel="noopener noreferrer" aria-label="View ${member.name} on LinkedIn">
               <i class="fab fa-linkedin-in"></i>
           </a>`
        : '';

    return `
        <article class="team-card reveal${isExecutive ? ' team-card--executive' : ''}" style="transition-delay: ${delay}s;">
            <div class="team-card-photo">
                <img src="${member.photo}" alt="${member.name}" loading="lazy">
                <div class="team-card-detail">
                    <p class="team-card-bio">${member.bio}</p>
                    <div class="team-card-hobby">
                        <span class="hobby-title">Unique Hobby:</span>
                        <p class="hobby-value">${member.hobby}</p>
                    </div>
                    ${linkedinHtml}
                </div>
            </div>
            <div class="team-card-info">
                <h3>${member.name}</h3>
                <p class="role-text">${member.role}</p>
                ${member.department ? `<p class="major-text">${member.department}</p>` : ''}
            </div>
        </article>
    `;
}

function renderTeamPage() {
    const container = document.getElementById('team-org-chart');
    if (!container) return;

    const departmentSections = TEAM_DATA.departments.map((dept, deptIndex) => `
        <section class="team-dept-section reveal" style="transition-delay: ${deptIndex * 0.05}s;">
            <div class="team-dept-header">
                <h3>${dept.name}</h3>
            </div>
            <div class="team-dept-grid">
                ${dept.members.map((member, i) =>
                    createTeamCard({ ...member, department: dept.name }, { delay: i * 0.06 })
                ).join('')}
            </div>
        </section>
    `).join('');

    container.innerHTML = `
        <div class="team-layout">
            <section class="team-exec-section">
                <div class="team-exec-header reveal">
                    <span class="team-exec-label">Executive Leadership</span>
                </div>
                <div class="team-exec-stack">
                    ${createTeamCard({ ...TEAM_DATA.president, department: 'Executives' }, { isExecutive: true })}
                    <div class="team-exec-line" aria-hidden="true"></div>
                    ${createTeamCard({ ...TEAM_DATA.vicePresident, department: 'Executives' }, { isExecutive: true, delay: 0.05 })}
                </div>
            </section>

            <div class="team-dept-divider reveal" aria-hidden="true"></div>

            ${departmentSections}
        </div>
    `;

    observeRevealElements(container);
}

function observeRevealElements(root) {
    const elements = root.querySelectorAll('.reveal:not(.active)');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

function initializeTeamCards() {
    document.querySelectorAll('.team-card img').forEach(img => {
        img.addEventListener('error', function () {
            const container = this.closest('.team-card-photo');
            if (!container) return;
            container.classList.add('team-photo-placeholder');
            this.remove();
            const placeholder = document.createElement('span');
            placeholder.className = 'photo-placeholder-text';
            placeholder.textContent = 'No Photo';
            container.prepend(placeholder);
        });
    });

    document.querySelectorAll('.team-card-photo').forEach(photo => {
        photo.addEventListener('click', function (e) {
            if (e.target.closest('.team-card-linkedin')) return;
            const card = this.closest('.team-card');
            const wasActive = card.classList.contains('is-active');
            document.querySelectorAll('.team-card.is-active').forEach(c => c.classList.remove('is-active'));
            if (!wasActive) card.classList.add('is-active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.team-card-photo')) {
            document.querySelectorAll('.team-card.is-active').forEach(c => c.classList.remove('is-active'));
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TEAM_DATA, renderTeamPage, initializeTeamCards };
}
