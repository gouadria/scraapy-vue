import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generatePDF = {
  async fromHTML(element: HTMLElement, filename: string): Promise<jsPDF> {
    // Store original styles
    const originalWidth = element.style.width
    const originalOverflow = element.style.overflow

    // Set width to 210mm for A4 and make content visible
    element.style.width = '210mm'
    element.style.overflow = 'visible'

    // Handle scrollable child elements
    const scrollableElements = element.querySelectorAll('[style*="overflow"]')
    const originalStyles: { element: HTMLElement; style: string }[] = []
    scrollableElements.forEach((scrollElement) => {
      const el = scrollElement as HTMLElement
      originalStyles.push({ element: el, style: el.style.overflow })
      el.style.overflow = 'visible'
    })

    const pdf = new jsPDF('p', 'mm', 'a4')

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution for quality
        useCORS: true,
        logging: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        width: element.scrollWidth,
        height: element.scrollHeight,
        imageTimeout: 15000
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = pdf.internal.pageSize.getWidth() // 210mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Handle pagination if content exceeds one page
      if (imgHeight > pdf.internal.pageSize.getHeight()) {
        let heightLeft = imgHeight
        let position = 0
        const pageHeight = pdf.internal.pageSize.getHeight() // 297mm

        // First page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        // Additional pages
        while (heightLeft > 0) {
          position = heightLeft - imgHeight // Negative offset for next section
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      }

      return pdf
    } finally {
      // Restore original styles
      element.style.width = originalWidth
      element.style.overflow = originalOverflow
      originalStyles.forEach((item) => {
        item.element.style.overflow = item.style
      })
    }
  }
}
