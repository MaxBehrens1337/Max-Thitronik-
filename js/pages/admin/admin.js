// ============================================
// THITRONIK Admin Pages
// ============================================

import { Auth } from '../../auth.js';
import { API } from '../../store.js';
import { showToast, showModal, closeModal, statusBadge, Icons, confirm as confirmDialog, renderProgressBar } from '../../components.js';

// ---- Admin Dashboard ----
export function renderAdminDashboard() {
  const content = document.getElementById('page-content');
  const courses = API.getCourses();
  const users = API.getUsers();
  const lessons = API.getLessons();
  const questions = API.getQuestions();
  const attempts = API.getAllQuizAttempts();

  const published = courses.filter(c => c.status === 'published').length;
  const incomplete = courses.filter(c => c.status === 'incomplete').length;

  content.innerHTML = `
    <div class="page-header"><h1 class="page-title">Admin Dashboard</h1><p class="page-subtitle">System-Übersicht und Verwaltung</p></div>
    <div class="dashboard-stats">
      <div class="stat-card animate-fade-in-up stagger-1">
        <div class="stat-icon primary">📚</div>
        <div class="stat-content"><div class="stat-value">${courses.length}</div><div class="stat-label">Kurse (${published} aktiv)</div></div>
      </div>
      <div class="stat-card animate-fade-in-up stagger-2">
        <div class="stat-icon secondary">📝</div>
        <div class="stat-content"><div class="stat-value">${lessons.length}</div><div class="stat-label">Lektionen</div></div>
      </div>
      <div class="stat-card animate-fade-in-up stagger-3">
        <div class="stat-icon lime">❓</div>
        <div class="stat-content"><div class="stat-value">${questions.length}</div><div class="stat-label">Quizfragen</div></div>
      </div>
      <div class="stat-card animate-fade-in-up stagger-4">
        <div class="stat-icon error">👥</div>
        <div class="stat-content"><div class="stat-value">${users.length}</div><div class="stat-label">Benutzer</div></div>
      </div>
    </div>
    ${incomplete > 0 ? `<div class="callout callout-warning mb-6"><div class="callout-title">Unvollständige Kurse</div>${incomplete} Kurs(e) sind als unvollständig markiert und benötigen Nacharbeit.</div>` : ''}
    <div class="grid-2">
      <div class="card animate-fade-in-up"><div class="card-body">
        <h3 class="card-title mb-4">Letzte Quiz-Aktivität</h3>
        ${attempts.length === 0 ? '<p class="text-muted">Keine Aktivität</p>' : attempts.slice(-8).reverse().map(a => {
          const u = API.getUser(a.userId);
          const l = API.getLesson(a.lessonId);
          return `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--gray-soft);font-size:var(--fs-body-sm)"><span>${a.passed ? '✅' : '❌'}</span><span style="flex:1">${u ? u.firstName + ' ' + u.lastName : '?'} – ${l ? l.title : '?'}</span><span style="font-weight:600">${a.score}%</span></div>`;
        }).join('')}
      </div></div>
      <div class="card animate-fade-in-up stagger-2"><div class="card-body">
        <h3 class="card-title mb-4">Schnellzugriff</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          <a href="#/admin/courses" class="btn btn-secondary" style="justify-content:flex-start">${Icons.courses} Kurse verwalten</a>
          <a href="#/admin/questions" class="btn btn-secondary" style="justify-content:flex-start">${Icons.quiz} Fragen verwalten</a>
          <a href="#/admin/users" class="btn btn-secondary" style="justify-content:flex-start">${Icons.users} Benutzer verwalten</a>
          <a href="#/admin/reporting" class="btn btn-secondary" style="justify-content:flex-start">${Icons.report} Reporting</a>
        </div>
      </div></div>
    </div>
  `;
}

// ---- Admin Courses ----
export function renderAdminCourses() {
  const content = document.getElementById('page-content');
  const courses = API.getCourses().sort((a, b) => a.sortOrder - b.sortOrder);

  content.innerHTML = `
    <div class="page-header"><div class="page-header-row"><div><h1 class="page-title">Kursverwaltung</h1><p class="page-subtitle">${courses.length} Kurse</p></div><button class="btn btn-primary" id="add-course-btn">${Icons.plus} Neuer Kurs</button></div></div>
    <div class="table-container animate-fade-in-up">
      <table>
        <thead><tr><th>Kurs</th><th>Status</th><th>Lektionen</th><th>Fragen</th><th>Dauer</th><th>Aktionen</th></tr></thead>
        <tbody>
          ${courses.map(c => {
            const lessons = API.getLessons(c.id);
            const questions = lessons.reduce((acc, l) => acc + API.getQuestions(l.id).length, 0);
            return `<tr>
              <td><div style="display:flex;align-items:center;gap:12px"><span style="font-size:24px">${c.icon}</span><div><strong>${c.title}</strong><br><span style="font-size:var(--fs-caption);color:var(--gray-dark)">${c.description.substring(0, 60)}...</span></div></div></td>
              <td>${statusBadge(c.status)}</td><td>${lessons.length}</td><td>${questions}</td><td>${c.estimatedDuration}</td>
              <td><div class="btn-group"><button class="btn btn-sm btn-secondary" onclick="window.location.hash='/admin/courses/${c.id}/edit'">${Icons.edit}</button><button class="btn btn-sm btn-danger" data-delete="${c.id}">${Icons.trash}</button></div></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('add-course-btn').onclick = () => showCourseModal();
  content.querySelectorAll('[data-delete]').forEach(btn => {
    btn.onclick = async () => {
      if (await confirmDialog('Kurs löschen', 'Möchten Sie diesen Kurs wirklich löschen?')) {
        API.deleteCourse(btn.dataset.delete);
        showToast('Kurs gelöscht', 'success');
        renderAdminCourses();
      }
    };
  });
}

function showCourseModal(course = null) {
  const isEdit = !!course;
  const modal = showModal(isEdit ? 'Kurs bearbeiten' : 'Neuer Kurs', `
    <div class="form-group"><label class="form-label">Titel <span class="required">*</span></label><input class="form-input" id="course-title" value="${course?.title || ''}"></div>
    <div class="form-group"><label class="form-label">Beschreibung</label><textarea class="form-textarea" id="course-desc">${course?.description || ''}</textarea></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Icon (Emoji)</label><input class="form-input" id="course-icon" value="${course?.icon || '📚'}"></div>
      <div class="form-group"><label class="form-label">Geschätzte Dauer</label><input class="form-input" id="course-duration" value="${course?.estimatedDuration || '30 min'}"></div>
    </div>
    <div class="form-group"><label class="form-label">Status</label><select class="form-select" id="course-status">
      <option value="draft" ${course?.status === 'draft' ? 'selected' : ''}>Entwurf</option>
      <option value="published" ${course?.status === 'published' ? 'selected' : ''}>Veröffentlicht</option>
      <option value="incomplete" ${course?.status === 'incomplete' ? 'selected' : ''}>Unvollständig</option>
    </select></div>
  `, `<button class="btn btn-secondary" onclick="document.querySelector('.modal-backdrop').remove()">Abbrechen</button><button class="btn btn-primary" id="save-course-btn">Speichern</button>`);

  modal.querySelector('#save-course-btn').onclick = () => {
    const title = modal.querySelector('#course-title').value.trim();
    if (!title) { showToast('Titel ist erforderlich', 'error'); return; }
    const data = {
      id: course?.id || API.generateId(),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: modal.querySelector('#course-desc').value,
      icon: modal.querySelector('#course-icon').value || '📚',
      estimatedDuration: modal.querySelector('#course-duration').value || '30 min',
      status: modal.querySelector('#course-status').value,
      sortOrder: course?.sortOrder || API.getCourses().length + 1,
    };
    API.saveCourse(data);
    closeModal();
    showToast(isEdit ? 'Kurs aktualisiert' : 'Kurs erstellt', 'success');
    renderAdminCourses();
  };
}

// ---- Admin Questions ----
export function renderAdminQuestions() {
  const content = document.getElementById('page-content');
  const questions = API.getQuestions();
  const lessons = API.getLessons();
  const courses = API.getCourses();

  content.innerHTML = `
    <div class="page-header"><div class="page-header-row"><div><h1 class="page-title">Fragenverwaltung</h1><p class="page-subtitle">${questions.length} Fragen</p></div><button class="btn btn-primary" id="add-question-btn">${Icons.plus} Neue Frage</button></div></div>
    <div class="table-container animate-fade-in-up">
      <table>
        <thead><tr><th>Frage</th><th>Typ</th><th>Lektion</th><th>Optionen</th><th>Aktionen</th></tr></thead>
        <tbody>
          ${questions.map(q => {
            const lesson = lessons.find(l => l.id === q.lessonId);
            const course = lesson ? courses.find(c => c.id === lesson.courseId) : null;
            return `<tr>
              <td style="max-width:300px"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${q.questionText}</div></td>
              <td>${q.multipleCorrect ? '<span class="badge badge-secondary">Multiple</span>' : '<span class="badge badge-primary">Single</span>'}</td>
              <td><span class="text-muted">${course ? course.title + ' → ' : ''}${lesson ? lesson.title : '–'}</span></td>
              <td>${q.options.length}</td>
              <td><div class="btn-group"><button class="btn btn-sm btn-secondary" data-edit-q="${q.id}">${Icons.edit}</button><button class="btn btn-sm btn-danger" data-del-q="${q.id}">${Icons.trash}</button></div></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('add-question-btn').onclick = () => showQuestionModal();
  content.querySelectorAll('[data-del-q]').forEach(btn => {
    btn.onclick = async () => {
      if (await confirmDialog('Frage löschen', 'Frage wirklich löschen?')) {
        API.deleteQuestion(btn.dataset.delQ);
        showToast('Frage gelöscht', 'success');
        renderAdminQuestions();
      }
    };
  });
  content.querySelectorAll('[data-edit-q]').forEach(btn => {
    btn.onclick = () => showQuestionModal(API.getQuestion(btn.dataset.editQ));
  });
}

function showQuestionModal(q = null) {
  const lessons = API.getLessons();
  const modal = showModal(q ? 'Frage bearbeiten' : 'Neue Frage', `
    <div class="form-group"><label class="form-label">Fragetext <span class="required">*</span></label><textarea class="form-textarea" id="q-text" rows="3">${q?.questionText || ''}</textarea></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Lektion</label><select class="form-select" id="q-lesson">${lessons.map(l => `<option value="${l.id}" ${q?.lessonId === l.id ? 'selected' : ''}>${l.title}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Mehrfachauswahl?</label><select class="form-select" id="q-multi"><option value="false" ${!q?.multipleCorrect ? 'selected' : ''}>Nein (Single Choice)</option><option value="true" ${q?.multipleCorrect ? 'selected' : ''}>Ja (Multiple Choice)</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Erklärung (optional)</label><input class="form-input" id="q-expl" value="${q?.explanation || ''}"></div>
    <h4 style="margin:var(--sp-4) 0 var(--sp-2)">Antwortoptionen</h4>
    <div id="options-container">
      ${(q?.options || [{text:'',isCorrect:false},{text:'',isCorrect:false},{text:'',isCorrect:false}]).map((o, i) => `
        <div class="form-row" style="margin-bottom:var(--sp-2);align-items:center">
          <input class="form-input opt-text" value="${o.text}" placeholder="Antwort ${i+1}">
          <label style="display:flex;align-items:center;gap:4px;white-space:nowrap"><input type="checkbox" class="opt-correct" ${o.isCorrect ? 'checked' : ''}> Richtig</label>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-sm btn-tertiary" id="add-option-btn">${Icons.plus} Option hinzufügen</button>
  `, `<button class="btn btn-secondary" onclick="document.querySelector('.modal-backdrop').remove()">Abbrechen</button><button class="btn btn-primary" id="save-q-btn">Speichern</button>`, { large: true });

  modal.querySelector('#add-option-btn').onclick = () => {
    const c = modal.querySelector('#options-container');
    const div = document.createElement('div');
    div.className = 'form-row';
    div.style = 'margin-bottom:var(--sp-2);align-items:center';
    div.innerHTML = `<input class="form-input opt-text" placeholder="Neue Antwort"><label style="display:flex;align-items:center;gap:4px;white-space:nowrap"><input type="checkbox" class="opt-correct"> Richtig</label>`;
    c.appendChild(div);
  };

  modal.querySelector('#save-q-btn').onclick = () => {
    const text = modal.querySelector('#q-text').value.trim();
    if (!text) { showToast('Fragetext erforderlich', 'error'); return; }
    const texts = modal.querySelectorAll('.opt-text');
    const corrects = modal.querySelectorAll('.opt-correct');
    const options = [];
    texts.forEach((t, i) => {
      if (t.value.trim()) options.push({ id: API.generateId(), text: t.value.trim(), isCorrect: corrects[i].checked, sortOrder: i + 1 });
    });
    if (options.length < 2) { showToast('Mindestens 2 Optionen', 'error'); return; }
    const data = {
      id: q?.id || API.generateId(), lessonId: modal.querySelector('#q-lesson').value,
      type: modal.querySelector('#q-multi').value === 'true' ? 'multiple' : 'single',
      questionText: text, explanation: modal.querySelector('#q-expl').value,
      multipleCorrect: modal.querySelector('#q-multi').value === 'true',
      sortOrder: q?.sortOrder || API.getQuestions().length + 1, options
    };
    API.saveQuestion(data);
    closeModal();
    showToast(q ? 'Frage aktualisiert' : 'Frage erstellt', 'success');
    renderAdminQuestions();
  };
}

// ---- Admin Users ----
export function renderAdminUsers() {
  const content = document.getElementById('page-content');
  const users = API.getUsers();

  const roleMap = { admin: 'Administrator', trainer: 'Trainer/Redakteur', learner: 'Lernender' };

  content.innerHTML = `
    <div class="page-header"><div class="page-header-row"><div><h1 class="page-title">Benutzerverwaltung</h1><p class="page-subtitle">${users.length} Benutzer</p></div><button class="btn btn-primary" id="add-user-btn">${Icons.plus} Neuer Benutzer</button></div></div>
    <div class="table-container animate-fade-in-up">
      <table><thead><tr><th>Name</th><th>E-Mail</th><th>Rolle</th><th>Kurse</th><th>Status</th><th>Aktionen</th></tr></thead>
        <tbody>${users.map(u => {
          const enrollments = API.getEnrollments(u.id);
          return `<tr>
            <td><div style="display:flex;align-items:center;gap:12px"><div class="avatar" style="background:linear-gradient(135deg,var(--th-blue-primary),var(--th-blue-secondary))">${(u.firstName?.[0]||'')+(u.lastName?.[0]||'')}</div><strong>${u.firstName} ${u.lastName}</strong></div></td>
            <td>${u.email}</td><td><span class="badge badge-primary">${roleMap[u.role] || u.role}</span></td>
            <td>${enrollments.length}</td><td>${u.active !== false ? '<span class="badge badge-success">Aktiv</span>' : '<span class="badge badge-error">Inaktiv</span>'}</td>
            <td><button class="btn btn-sm btn-secondary" data-edit-u="${u.id}">${Icons.edit}</button></td>
          </tr>`;
        }).join('')}</tbody>
      </table>
    </div>
  `;

  document.getElementById('add-user-btn').onclick = () => showUserModal();
  content.querySelectorAll('[data-edit-u]').forEach(btn => {
    btn.onclick = () => showUserModal(API.getUser(btn.dataset.editU));
  });
}

function showUserModal(user = null) {
  const modal = showModal(user ? 'Benutzer bearbeiten' : 'Neuer Benutzer', `
    <div class="form-row"><div class="form-group"><label class="form-label">Vorname</label><input class="form-input" id="u-first" value="${user?.firstName||''}"></div><div class="form-group"><label class="form-label">Nachname</label><input class="form-input" id="u-last" value="${user?.lastName||''}"></div></div>
    <div class="form-group"><label class="form-label">E-Mail</label><input class="form-input" type="email" id="u-email" value="${user?.email||''}"></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Passwort</label><input class="form-input" type="password" id="u-pw" placeholder="${user?'Leer lassen = unverändert':'Passwort'}"></div>
    <div class="form-group"><label class="form-label">Rolle</label><select class="form-select" id="u-role"><option value="learner" ${user?.role==='learner'?'selected':''}>Lernender</option><option value="trainer" ${user?.role==='trainer'?'selected':''}>Trainer</option><option value="admin" ${user?.role==='admin'?'selected':''}>Admin</option></select></div></div>
  `, `<button class="btn btn-secondary" onclick="document.querySelector('.modal-backdrop').remove()">Abbrechen</button><button class="btn btn-primary" id="save-u-btn">Speichern</button>`);

  modal.querySelector('#save-u-btn').onclick = () => {
    const data = {
      id: user?.id || API.generateId(),
      firstName: modal.querySelector('#u-first').value,
      lastName: modal.querySelector('#u-last').value,
      email: modal.querySelector('#u-email').value,
      password: modal.querySelector('#u-pw').value || user?.password || 'default123',
      role: modal.querySelector('#u-role').value,
      active: true,
    };
    const users = API.getUsers();
    const idx = users.findIndex(u => u.id === data.id);
    if (idx >= 0) users[idx] = { ...users[idx], ...data, password: data.password || users[idx].password };
    else users.push(data);
    API.saveUsers(users);
    closeModal();
    showToast('Benutzer gespeichert', 'success');
    renderAdminUsers();
  };
}

// ---- Admin Reporting ----
export function renderAdminReporting() {
  const content = document.getElementById('page-content');
  const courses = API.getCourses();
  const users = API.getUsers().filter(u => u.role === 'learner');
  const attempts = API.getAllQuizAttempts();

  content.innerHTML = `
    <div class="page-header"><h1 class="page-title">Reporting</h1><p class="page-subtitle">Auswertungen und Statistiken</p></div>
    <div class="tabs"><button class="tab active" data-tab="courses">Kurs-Fortschritt</button><button class="tab" data-tab="quiz">Quiz-Ergebnisse</button><button class="tab" data-tab="users">Nutzer-Übersicht</button></div>
    <div id="report-content"></div>
  `;

  function showTab(tab) {
    content.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    const rc = document.getElementById('report-content');
    if (tab === 'courses') {
      rc.innerHTML = `<div class="card"><div class="card-body">${courses.filter(c=>c.status==='published').map(c => {
        const enrolled = API.getEnrollments().filter(e=>e.courseId===c.id).length;
        const completions = users.filter(u=>{const p=API.getCourseProgress(u.id,c.id);return p.percent===100}).length;
        const rate = enrolled > 0 ? Math.round((completions/enrolled)*100) : 0;
        return `<div class="report-bar"><div class="report-bar-label">${c.icon} ${c.title}</div><div class="report-bar-track"><div class="report-bar-fill" style="width:${Math.max(rate,5)}%">${rate}%</div></div><div class="report-bar-value">${completions}/${enrolled}</div></div>`;
      }).join('')}</div></div>`;
    } else if (tab === 'quiz') {
      rc.innerHTML = `<div class="table-container"><table><thead><tr><th>Nutzer</th><th>Lektion</th><th>Score</th><th>Status</th><th>Datum</th></tr></thead><tbody>${attempts.slice(-20).reverse().map(a=>{
        const u=API.getUser(a.userId);const l=API.getLesson(a.lessonId);
        return `<tr><td>${u?u.firstName+' '+u.lastName:'–'}</td><td>${l?l.title:'–'}</td><td><strong>${a.score}%</strong></td><td>${a.passed?'<span class="badge badge-success">Bestanden</span>':'<span class="badge badge-error">Nicht bestanden</span>'}</td><td>${new Date(a.date).toLocaleDateString('de-DE')}</td></tr>`;
      }).join('')}</tbody></table></div>`;
    } else {
      rc.innerHTML = `<div class="table-container"><table><thead><tr><th>Nutzer</th><th>Eingeschrieben</th><th>Abgeschlossen</th><th>Quizze</th><th>Ø Score</th></tr></thead><tbody>${users.map(u=>{
        const enr=API.getEnrollments(u.id).length;
        const compl=courses.filter(c=>{const p=API.getCourseProgress(u.id,c.id);return p.percent===100}).length;
        const ua=attempts.filter(a=>a.userId===u.id);
        const avg=ua.length>0?Math.round(ua.reduce((s,a)=>s+a.score,0)/ua.length):0;
        return `<tr><td><strong>${u.firstName} ${u.lastName}</strong></td><td>${enr}</td><td>${compl}</td><td>${ua.length}</td><td>${avg}%</td></tr>`;
      }).join('')}</tbody></table></div>`;
    }
  }

  showTab('courses');
  content.querySelectorAll('.tab').forEach(t => t.onclick = () => showTab(t.dataset.tab));
}
