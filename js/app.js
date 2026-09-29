$(function () {
    "use strict";

    const checklists = {
        weekly: [
            {
                section: "Racks: puerta delantera",
                items: [
                    { id: "front-equipment-on", label: "Equipos encendidos (electrónica de red y servidores)." },
                    { id: "front-server-disk-leds", label: "LED exteriores de los discos de los servidores en color verde." },
                    { id: "front-switch-connection-leds", label: "LED de conexiones de los switches en color verde." },
                    { id: "front-loose-cabling", label: "Inexistencia de cableado suelto." }
                ]
            },
            {
                section: "Racks: puerta trasera",
                items: [
                    { id: "rear-server-power-leds", label: "Fuentes de alimentación de cada servidor con LED verde." },
                    { id: "rear-server-network-leds", label: "LED de conexiones de red de los servidores en color verde." }
                ]
            },
            {
                section: "Panel de control UPS secundario",
                items: [
                    { id: "secondary-ups-alarms", label: "Sin alarmas visibles." },
                    { id: "secondary-ups-input-voltage", label: "Voltaje de entrada entre 378 V y 383 V." },
                    { id: "secondary-ups-output-voltage", label: "Voltaje de salida entre 219 V y 223 V." },
                    { id: "secondary-ups-load-level", label: "Nivel de carga no superior al 33 % por fase." }
                ]
            },
            {
                section: "Refrigeración y sala",
                items: [
                    { id: "cooling-columns-alarms", label: "Panel de columnas de refrigeración sin alarmas." },
                    { id: "floor-condition", label: "Estado del suelo limpio y sin muestras de agua." }
                ]
            }
        ],
        monthly: [
            {
                section: "Verificación de alta disponibilidad eléctrica en la sala técnica",
                groups: [
                    {
                        title: "Corte de UPS secundario",
                        items: [
                            { id: "secondary-ups-output-cut", label: "Cortar la salida del UPS secundario en el cuadro eléctrico situado en la pared izquierda superior, detrás del UPS secundario." },
                            { id: "secondary-ups-equipment-inspection", label: "Realizar una inspección visual del funcionamiento de los equipos." },
                            { id: "secondary-ups-wait", label: "Mantener el corte entre 5 y 10 minutos." },
                            { id: "secondary-ups-output-restore", label: "Activar la salida del UPS secundario." }
                        ]
                    },
                    {
                        title: "Corte de UPS principal",
                        items: [
                            { id: "main-ups-output-cut", label: "Cortar la salida del UPS principal en el cuadro eléctrico de la sala de cuadros eléctricos del casino (térmico número 6)." },
                            { id: "main-ups-equipment-inspection", label: "Realizar una inspección visual del funcionamiento de los equipos." },
                            { id: "main-ups-wait", label: "Mantener el corte entre 5 y 10 minutos." },
                            { id: "secondary-ups-discharge", label: "Registrar el porcentaje de descarga del UPS secundario y el tiempo restante." },
                            { id: "main-ups-output-restore", label: "Activar la salida del UPS principal en el cuadro eléctrico." }
                        ]
                    }
                ]
            },
            {
                section: "Funcionamiento del UPS principal con carga y sin generador",
                items: [
                    { id: "main-ups-input-cut", label: "Cortar la entrada del UPS principal en la sala de transformación del complejo." },
                    { id: "rooms-visual-inspection", label: "Inspeccionar visualmente la sala de máquinas, el bingo y la sala técnica." },
                    { id: "main-ups-load-wait", label: "Mantener el corte entre 5 y 10 minutos." },
                    { id: "main-ups-discharge", label: "Registrar el porcentaje de descarga del UPS principal y el tiempo restante." },
                    { id: "main-ups-input-restore", label: "Activar la entrada del UPS principal en el cuadro eléctrico." }
                ]
            },
            {
                section: "Funcionamiento de los generadores de emergencia",
                items: [
                    { id: "complex-power-input-cut", label: "Cortar la entrada de energía del complejo." },
                    { id: "generator-start", label: "Esperar la entrada del generador." },
                    { id: "generator-start-time", label: "Verificar que el tiempo de arranque del generador sea menor a 2 minutos." },
                    { id: "generator-powered-services", label: "Verificar que la sala de juego, el alumbrado y las puertas eléctricas estén operativos." },
                    { id: "generator-operation-wait", label: "Mantener el generador en funcionamiento al menos 1 minuto." },
                    { id: "complex-power-input-restore", label: "Activar la entrada de energía del complejo." }
                ]
            },
            {
                section: "Funcionamiento de los sistemas de refrigeración",
                items: [
                    { id: "left-cooling-column-off", label: "Apagar la columna de refrigeración izquierda." },
                    { id: "left-cooling-column-wait", label: "Mantenerla apagada durante un mínimo de 10 minutos." },
                    { id: "room-temperature-check", label: "Verificar la temperatura de la sala." },
                    { id: "left-cooling-column-restore", label: "Encender la columna de refrigeración izquierda y esperar a que recupere la temperatura." },
                    { id: "right-cooling-column-process", label: "Repetir el proceso con la columna de refrigeración derecha." }
                ]
            }
        ]
    };

    const sectionTitles = {
        weekly: "Revisión semanal",
        monthly: "Revisión mensual"
    };

    const pdfSettings = {
        weekly: {
            title: "Revisión DRP semanal",
            subtitle: "Prevención y mantenimiento de infraestructura"
        },
        monthly: {
            title: "Revisión DRP mensual",
            subtitle: "Disponibilidad eléctrica y sistemas críticos"
        }
    };

    function escapeHtml(value) {
        return $("<div>").text(value).html();
    }

    function createItemRow(formKey, item) {
        const safeId = `${formKey}-${item.id}`;
        const fieldName = `${formKey}[${item.id}]`;

        return `
            <tr>
                <th scope="row">${escapeHtml(item.label)}</th>
                <td class="check-cell">
                    <input class="form-check-input" type="checkbox" id="check-${safeId}" name="${fieldName}[checked]" value="1" aria-label="Comprobar: ${escapeHtml(item.label)}">
                </td>
                <td>
                    <label class="visually-hidden" for="severity-${safeId}">Nivel de gravedad: ${escapeHtml(item.label)}</label>
                    <select class="form-select severity-select" id="severity-${safeId}" name="${fieldName}[severity]">
                        <option value="">Seleccionar...</option>
                        <option value="bajo">Bajo</option>
                        <option value="medio">Medio</option>
                        <option value="alto">Alto</option>
                    </select>
                </td>
                <td>
                    <label class="visually-hidden" for="observation-${safeId}">Observación: ${escapeHtml(item.label)}</label>
                    <input class="form-control observation-input" type="text" id="observation-${safeId}" name="${fieldName}[observation]" placeholder="Añadir observación">
                </td>
            </tr>`;
    }

    function renderChecklist(formKey) {
        let rows = "";
        let itemCount = 0;

        checklists[formKey].forEach(function (section) {
            rows += `<tr class="checklist-section-row"><th colspan="4" scope="colgroup">${escapeHtml(section.section)}</th></tr>`;

            if (section.groups) {
                section.groups.forEach(function (group) {
                    rows += `<tr class="checklist-subsection-row"><th colspan="4" scope="colgroup">${escapeHtml(group.title)}</th></tr>`;
                    group.items.forEach(function (item) {
                        rows += createItemRow(formKey, item);
                        itemCount += 1;
                    });
                });
            } else {
                section.items.forEach(function (item) {
                    rows += createItemRow(formKey, item);
                    itemCount += 1;
                });
            }
        });

        $(`#${formKey}Checklist`).html(rows);
        $(`#${formKey}Count`).text(`${itemCount} puntos de control`);
    }

    function closeSidebar() {
        $("body").removeClass("sidebar-open");
        $("#menuToggle").attr("aria-expanded", "false");
    }

    function showSection(sectionKey) {
        const $target = $(`[data-form-section="${sectionKey}"]`);

        if (!$target.length) {
            return;
        }

        $("[data-form-section]").removeClass("active").prop("hidden", true);
        $target.addClass("active").prop("hidden", false);

        $(".nav-item").removeClass("active").removeAttr("aria-current");
        $(`.nav-item[data-section="${sectionKey}"]`).addClass("active").attr("aria-current", "page");
        $("#pageTitle").text(sectionTitles[sectionKey]);

        closeSidebar();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function getFormattedDate(dateValue) {
        if (!dateValue) {
            return "Sin indicar";
        }

        return new Date(`${dateValue}T00:00:00`).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    function getPdfItemRow(formKey, item) {
        const safeId = `${formKey}-${item.id}`;
        const checked = $(`#check-${safeId}`).prop("checked") ? "Sí" : "No";
        const severity = $(`#severity-${safeId} option:selected`).text();
        const observation = $(`#observation-${safeId}`).val().trim() || "Sin observación";

        return [item.label, checked, severity, observation];
    }

    function getPdfRows(formKey) {
        const rows = [];

        checklists[formKey].forEach(function (section) {
            rows.push([{
                content: section.section,
                colSpan: 4,
                styles: {
                    fillColor: [234, 242, 247],
                    textColor: [17, 28, 49],
                    fontStyle: "bold",
                    cellPadding: 3
                }
            }]);

            if (section.groups) {
                section.groups.forEach(function (group) {
                    rows.push([{
                        content: group.title,
                        colSpan: 4,
                        styles: {
                            fillColor: [244, 247, 249],
                            textColor: [64, 97, 118],
                            fontStyle: "bold",
                            cellPadding: 2.5
                        }
                    }]);
                    group.items.forEach(function (item) {
                        rows.push(getPdfItemRow(formKey, item));
                    });
                });
            } else {
                section.items.forEach(function (item) {
                    rows.push(getPdfItemRow(formKey, item));
                });
            }
        });

        return rows;
    }

    function addPdfHeader(doc, settings) {
        doc.setFillColor(17, 28, 49);
        doc.rect(0, 0, 297, 23, "F");

        const logo = document.querySelector(".brand-logo");
        if (logo && logo.complete) {
            try {
                doc.addImage(logo, "PNG", 12, 6.5, 43, 9.4);
            } catch (error) {
                // El contenido del PDF puede generarse aunque el navegador bloquee la imagen local.
            }
        }

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(settings.title, 64, 10.5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(190, 215, 229);
        doc.text(settings.subtitle, 64, 16);
    }

    function addPdfMetadata(doc, formKey) {
        const date = getFormattedDate($(`#${formKey}Date`).val());
        const responsible = $(`#${formKey}Name`).val().trim() || "Sin indicar";
        const signature = $(`#${formKey}Signature`).val().trim() || "Sin indicar";
        const fields = [
            { label: "FECHA", value: date, x: 12, width: 58 },
            { label: "RESPONSABLE", value: responsible, x: 74, width: 112 },
            { label: "FIRMA", value: signature, x: 190, width: 95 }
        ];

        fields.forEach(function (field) {
            doc.setFillColor(244, 247, 250);
            doc.roundedRect(field.x, 27, field.width, 15, 1.5, 1.5, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(6.5);
            doc.setTextColor(45, 117, 166);
            doc.text(field.label, field.x + 3, 32);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(38, 53, 72);
            doc.text(doc.splitTextToSize(field.value, field.width - 6)[0], field.x + 3, 38);
        });
    }

    function downloadPdf(formKey) {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            window.alert("No se pudo cargar el generador de PDF. Comprueba tu conexión e inténtalo de nuevo.");
            return;
        }

        const settings = pdfSettings[formKey];
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

        addPdfHeader(doc, settings);
        addPdfMetadata(doc, formKey);

        doc.autoTable({
            startY: 47,
            margin: { top: 12, right: 12, bottom: 13, left: 12 },
            head: [["Punto de revisión", "Check", "Nivel de gravedad", "Observación"]],
            body: getPdfRows(formKey),
            theme: "grid",
            styles: {
                font: "helvetica",
                fontSize: 7.3,
                textColor: [38, 53, 72],
                lineColor: [220, 228, 235],
                lineWidth: 0.2,
                cellPadding: 2.4,
                valign: "middle"
            },
            headStyles: {
                fillColor: [45, 117, 166],
                textColor: [255, 255, 255],
                fontStyle: "bold",
                halign: "center",
                cellPadding: 3
            },
            columnStyles: {
                0: { cellWidth: 128 },
                1: { cellWidth: 18, halign: "center" },
                2: { cellWidth: 38, halign: "center" },
                3: { cellWidth: 89 }
            },
            didDrawPage: function (data) {
                const pageHeight = doc.internal.pageSize.getHeight();
                const pageWidth = doc.internal.pageSize.getWidth();
                doc.setFont("helvetica", "normal");
                doc.setFontSize(7);
                doc.setTextColor(107, 120, 137);
                doc.text(`Página ${data.pageNumber}`, pageWidth - 12, pageHeight - 6, { align: "right" });
                doc.text("Control DRP · Luckia", 12, pageHeight - 6);
            }
        });

        const dateForFile = $(`#${formKey}Date`).val() || new Date().toISOString().slice(0, 10);
        const frequency = formKey === "weekly" ? "semanal" : "mensual";
        doc.save(`revision-drp-${frequency}-${dateForFile}.pdf`);
    }

    renderChecklist("weekly");
    renderChecklist("monthly");

    $(".nav-item[data-section]").on("click", function () {
        showSection($(this).data("section"));
    });

    $("[data-download-pdf]").on("click", function () {
        const $button = $(this);
        const originalContent = $button.html();
        $button.prop("disabled", true).text("Generando PDF...");

        window.setTimeout(function () {
            try {
                downloadPdf($button.data("download-pdf"));
            } finally {
                $button.prop("disabled", false).html(originalContent);
            }
        }, 30);
    });

    $("#menuToggle").on("click", function () {
        $("body").addClass("sidebar-open");
        $(this).attr("aria-expanded", "true");
    });

    $("#sidebarClose, #sidebarOverlay").on("click", closeSidebar);

    $(document).on("keydown", function (event) {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });

    $(window).on("resize", function () {
        if (window.innerWidth >= 992) {
            closeSidebar();
        }
    });
});
