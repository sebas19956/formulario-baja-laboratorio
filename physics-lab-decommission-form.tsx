"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PrinterIcon, DownloadIcon, FileTextIcon, ArrowLeftIcon } from "lucide-react"

interface FormData {
  itemCategory: string
  itemType: string
  brand: string
  model: string
  serialNumber: string
  inventoryNumber: string
  hasInventoryNumber: boolean
  itemStatus: string
  decommissionReason: string
  responsibleName: string
  responsiblePosition: string
  department: string
  decommissionDate: string
  observations: string
  labLocation: string
  customItemName?: string
  hasSerialNumber?: boolean
}

export default function PhysicsLabDecommissionForm() {
  const [showReport, setShowReport] = useState(false)
  const [reportNumber, setReportNumber] = useState("")
  const [formData, setFormData] = useState<FormData>({
    itemCategory: "",
    itemType: "",
    brand: "",
    model: "",
    serialNumber: "",
    inventoryNumber: "",
    hasInventoryNumber: true,
    itemStatus: "",
    decommissionReason: "",
    responsibleName: "",
    responsiblePosition: "",
    department: "Laboratorio de Física",
    decommissionDate: new Date().toISOString().split("T")[0],
    observations: "",
    labLocation: "",
  })

  const generateReportNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const time = String(date.getHours()).padStart(2, "0") + String(date.getMinutes()).padStart(2, "0")
    return `LAB-FIS-${year}${month}${day}-${time}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReportNumber = generateReportNumber()
    setReportNumber(newReportNumber)
    setShowReport(true)
    console.log("Formulario enviado:", formData)
  }

  const handlePrintReport = () => {
    window.print()
  }

  const handleExportReport = () => {
    const reportData = {
      reportNumber,
      ...formData,
      generatedDate: new Date().toISOString(),
    }
    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `reporte_baja_${reportNumber}.json`
    link.click()
  }

  const getItemTypes = () => {
    if (formData.itemCategory === "equipo") {
      return [
        { value: "osciloscopio", label: "Osciloscopio" },
        { value: "multimetro", label: "Multímetro" },
        { value: "generador-funciones", label: "Generador de Funciones" },
        { value: "fuente-poder", label: "Fuente de Poder" },
        { value: "balanza-precision", label: "Balanza de Precisión" },
        { value: "microscopio", label: "Microscopio" },
        { value: "espectrofotometro", label: "Espectrofotómetro" },
        { value: "laser", label: "Láser" },
        { value: "detector-radiacion", label: "Detector de Radiación" },
        { value: "bomba-vacio", label: "Bomba de Vacío" },
        { value: "centrifuga", label: "Centrífuga" },
        { value: "agitador-magnetico", label: "Agitador Magnético" },
        { value: "horno", label: "Horno/Estufa" },
        { value: "refrigerador", label: "Refrigerador de Laboratorio" },
        { value: "computadora", label: "Computadora" },
        { value: "proyector", label: "Proyector" },
        { value: "otro-equipo", label: "Otro Equipo" },
      ]
    } else if (formData.itemCategory === "material") {
      return [
        { value: "cristaleria", label: "Cristalería" },
        { value: "instrumentos-medicion", label: "Instrumentos de Medición" },
        { value: "componentes-electronicos", label: "Componentes Electrónicos" },
        { value: "reactivos", label: "Reactivos Químicos" },
        { value: "materiales-opticos", label: "Materiales Ópticos" },
        { value: "herramientas", label: "Herramientas" },
        { value: "mobiliario", label: "Mobiliario de Laboratorio" },
        { value: "material-seguridad", label: "Material de Seguridad" },
        { value: "cables-conectores", label: "Cables y Conectores" },
        { value: "consumibles", label: "Consumibles" },
        { value: "otro-material", label: "Otro Material" },
      ]
    }
    return []
  }

  if (showReport) {
    return (
      <div className="min-h-screen bg-white">
        {/* Encabezado del reporte */}
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">LABORATORIO DE FÍSICA</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">REPORTE DE BAJA DE EQUIPOS Y MATERIALES</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold">Reporte No: {reportNumber}</p>
              <p className="text-sm text-gray-600">
                Generado el:{" "}
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Información del elemento */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              INFORMACIÓN DEL {formData.itemCategory.toUpperCase()}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Categoría:</strong> {formData.itemCategory === "equipo" ? "Equipo" : "Material"}
              </div>
              <div>
                <strong>Tipo:</strong>{" "}
                {formData.itemType === "otro-equipo" || formData.itemType === "otro-material"
                  ? formData.customItemName
                  : getItemTypes().find((item) => item.value === formData.itemType)?.label || formData.itemType}
              </div>
              <div>
                <strong>Marca:</strong> {formData.brand || "No especificada"}
              </div>
              <div>
                <strong>Modelo:</strong> {formData.model || "No especificado"}
              </div>
              <div>
                <strong>Número de Serie:</strong>{" "}
                {formData.hasSerialNumber ? formData.serialNumber || "No especificado" : "Sin número de serie"}
              </div>
              <div>
                <strong>Número de Inventario:</strong>{" "}
                {formData.hasInventoryNumber ? formData.inventoryNumber || "No asignado" : "Sin número de inventario"}
              </div>
              <div>
                <strong>Ubicación en Laboratorio:</strong> {formData.labLocation || "No especificada"}
              </div>
            </div>
          </div>

          {/* Estado y motivo de baja */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              ESTADO Y MOTIVO DE BAJA
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Estado del Elemento:</strong>{" "}
                {formData.itemStatus === "funcional"
                  ? "Funcional"
                  : formData.itemStatus === "no-funcional"
                    ? "No Funcional"
                    : formData.itemStatus === "parcialmente-funcional"
                      ? "Parcialmente Funcional"
                      : formData.itemStatus === "desconocido"
                        ? "Estado Desconocido"
                        : formData.itemStatus}
              </div>
              <div>
                <strong>Motivo de Baja:</strong>{" "}
                {formData.decommissionReason === "obsolescencia"
                  ? "Obsolescencia Tecnológica"
                  : formData.decommissionReason === "daño-irreparable"
                    ? "Daño Irreparable"
                    : formData.decommissionReason === "costo-reparacion"
                      ? "Costo de Reparación Elevado"
                      : formData.decommissionReason === "fin-vida-util"
                        ? "Fin de Vida Útil"
                        : formData.decommissionReason === "reemplazo"
                          ? "Reemplazo por Equipo Nuevo"
                          : formData.decommissionReason === "robo-perdida"
                            ? "Robo o Pérdida"
                            : formData.decommissionReason === "reorganizacion"
                              ? "Reorganización de Laboratorio"
                              : formData.decommissionReason === "contaminacion"
                                ? "Contaminación"
                                : formData.decommissionReason === "descalibracion"
                                  ? "Descalibración Permanente"
                                  : formData.decommissionReason}
              </div>
            </div>
          </div>

          {/* Información del responsable */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              INFORMACIÓN DEL RESPONSABLE
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Nombre:</strong> {formData.responsibleName}
              </div>
              <div>
                <strong>Cargo:</strong>{" "}
                {formData.responsiblePosition === "tecnico-laboratorio"
                  ? "Técnico de Laboratorio"
                  : formData.responsiblePosition === "coordinador"
                    ? "Coordinador"
                    : formData.responsiblePosition === "monitor"
                      ? "Monitor"
                      : formData.responsiblePosition || "No especificado"}
              </div>
              <div>
                <strong>Departamento:</strong> {formData.department}
              </div>
              <div>
                <strong>Fecha de Baja:</strong> {new Date(formData.decommissionDate).toLocaleDateString("es-ES")}
              </div>
            </div>
          </div>

          {/* Observaciones */}
          {formData.observations && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">OBSERVACIONES</h3>
              <p className="text-sm bg-gray-50 p-4 rounded">{formData.observations}</p>
            </div>
          )}

          {/* Firmas */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div className="border-t-2 border-gray-400 pt-2">
              <p className="font-semibold">Solicitado por:</p>
              <p className="text-sm mt-8">{formData.responsibleName}</p>
              <p className="text-xs text-gray-600">{formData.responsiblePosition}</p>
            </div>
            <div className="border-t-2 border-gray-400 pt-2">
              <p className="font-semibold">Autorizado por:</p>
              <p className="text-sm mt-8">_________________________</p>
              <p className="text-xs text-gray-600">Jefe de Laboratorio</p>
            </div>
            <div className="border-t-2 border-gray-400 pt-2">
              <p className="font-semibold">Recibido por:</p>
              <p className="text-sm mt-8">_________________________</p>
              <p className="text-xs text-gray-600">Administración</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-6 border-t-2 border-gray-200 no-print">
            <Button onClick={() => setShowReport(false)} variant="outline" className="flex items-center gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              Volver al Formulario
            </Button>
            <Button onClick={handlePrintReport} className="flex items-center gap-2">
              <PrinterIcon className="w-4 h-4" />
              Imprimir Reporte
            </Button>
            <Button onClick={handleExportReport} variant="outline" className="flex items-center gap-2">
              <DownloadIcon className="w-4 h-4" />
              Exportar Datos
            </Button>
          </div>
        </div>

        <style jsx global>{`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              print-color-adjust: exact;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl font-bold text-gray-800">LABORATORIO DE FÍSICA</CardTitle>
            <CardDescription className="text-lg">
              Formulario de Baja de Equipos y Materiales de Laboratorio
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Categoría y Tipo */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">1. CLASIFICACIÓN DEL ELEMENTO</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="itemCategory">Categoría *</Label>
                    <Select
                      value={formData.itemCategory}
                      onValueChange={(value) => setFormData({ ...formData, itemCategory: value, itemType: "" })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipo">Equipo de Laboratorio</SelectItem>
                        <SelectItem value="material">Material de Laboratorio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemType">Tipo Específico *</Label>
                    <Select
                      value={formData.itemType}
                      onValueChange={(value) => setFormData({ ...formData, itemType: value })}
                      disabled={!formData.itemCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo específico" />
                      </SelectTrigger>
                      <SelectContent>
                        {getItemTypes().map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {(formData.itemType === "otro-equipo" || formData.itemType === "otro-material") && (
                      <div className="space-y-2">
                        <Label htmlFor="customItemName">
                          Especificar {formData.itemCategory === "equipo" ? "Equipo" : "Material"} *
                        </Label>
                        <Input
                          id="customItemName"
                          value={formData.customItemName || ""}
                          onChange={(e) => setFormData({ ...formData, customItemName: e.target.value })}
                          placeholder={`Nombre específico del ${formData.itemCategory}`}
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Información Técnica */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">2. INFORMACIÓN TÉCNICA</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Ej: Fluke, Tektronix, Agilent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="Modelo específico"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasSerialNumber"
                        checked={formData.hasSerialNumber || false}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            hasSerialNumber: checked as boolean,
                            serialNumber: checked ? formData.serialNumber : "",
                          })
                        }
                      />
                      <Label htmlFor="hasSerialNumber">El elemento tiene número de serie</Label>
                    </div>

                    {formData.hasSerialNumber && (
                      <div className="space-y-2">
                        <Label htmlFor="serialNumber">Número de Serie</Label>
                        <Input
                          id="serialNumber"
                          value={formData.serialNumber}
                          onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                          placeholder="Número de serie del fabricante"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="labLocation">Ubicación en Laboratorio</Label>
                    <Input
                      id="labLocation"
                      value={formData.labLocation}
                      onChange={(e) => setFormData({ ...formData, labLocation: e.target.value })}
                      placeholder="Ej: Mesa 3, Estante A, Sala 201"
                    />
                  </div>
                </div>

                {/* Número de Inventario */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasInventoryNumber"
                      checked={formData.hasInventoryNumber}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, hasInventoryNumber: checked as boolean })
                      }
                    />
                    <Label htmlFor="hasInventoryNumber">El elemento tiene número de inventario</Label>
                  </div>

                  {formData.hasInventoryNumber && (
                    <div className="space-y-2">
                      <Label htmlFor="inventoryNumber">Número de Inventario</Label>
                      <Input
                        id="inventoryNumber"
                        value={formData.inventoryNumber}
                        onChange={(e) => setFormData({ ...formData, inventoryNumber: e.target.value })}
                        placeholder="Número de inventario institucional"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Estado y Motivo de Baja */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">3. ESTADO Y MOTIVO DE BAJA</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="itemStatus">Estado del Elemento *</Label>
                    <Select
                      value={formData.itemStatus}
                      onValueChange={(value) => setFormData({ ...formData, itemStatus: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="funcional">Funcional</SelectItem>
                        <SelectItem value="no-funcional">No Funcional</SelectItem>
                        <SelectItem value="parcialmente-funcional">Parcialmente Funcional</SelectItem>
                        <SelectItem value="desconocido">Estado Desconocido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="decommissionReason">Motivo de Baja *</Label>
                    <Select
                      value={formData.decommissionReason}
                      onValueChange={(value) => setFormData({ ...formData, decommissionReason: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="obsolescencia">Obsolescencia Tecnológica</SelectItem>
                        <SelectItem value="daño-irreparable">Daño Irreparable</SelectItem>
                        <SelectItem value="costo-reparacion">Costo de Reparación Elevado</SelectItem>
                        <SelectItem value="fin-vida-util">Fin de Vida Útil</SelectItem>
                        <SelectItem value="reemplazo">Reemplazo por Equipo Nuevo</SelectItem>
                        <SelectItem value="robo-perdida">Robo o Pérdida</SelectItem>
                        <SelectItem value="reorganizacion">Reorganización de Laboratorio</SelectItem>
                        <SelectItem value="contaminacion">Contaminación</SelectItem>
                        <SelectItem value="descalibracion">Descalibración Permanente</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Información del Responsable */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">4. INFORMACIÓN DEL RESPONSABLE</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="responsibleName">Nombre Completo *</Label>
                    <Input
                      id="responsibleName"
                      value={formData.responsibleName}
                      onChange={(e) => setFormData({ ...formData, responsibleName: e.target.value })}
                      placeholder="Nombre del responsable"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsiblePosition">Cargo/Posición</Label>
                    <Select
                      value={formData.responsiblePosition}
                      onValueChange={(value) => setFormData({ ...formData, responsiblePosition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnico-laboratorio">Técnico de Laboratorio</SelectItem>
                        <SelectItem value="coordinador">Coordinador</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      placeholder="Departamento o área"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="decommissionDate">Fecha de Baja *</Label>
                    <Input
                      id="decommissionDate"
                      type="date"
                      value={formData.decommissionDate}
                      onChange={(e) => setFormData({ ...formData, decommissionDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">5. OBSERVACIONES ADICIONALES</h3>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observaciones</Label>
                  <Textarea
                    id="observations"
                    value={formData.observations}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                    placeholder="Detalles adicionales: condiciones especiales, accesorios incluidos, historial de reparaciones, razones específicas de la baja, etc."
                    rows={4}
                  />
                </div>
              </div>

              {/* Botón de Envío */}
              <div className="flex justify-center pt-6 border-t">
                <Button type="submit" className="px-8 py-3 text-lg flex items-center gap-2">
                  <FileTextIcon className="w-5 h-5" />
                  Generar Reporte de Baja
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-3">Instrucciones para el Laboratorio de Física:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Los campos marcados con (*) son obligatorios</li>
              <li>• Seleccione "Equipo" para instrumentos de medición, computadoras, etc.</li>
              <li>• Seleccione "Material" para cristalería, reactivos, herramientas, etc.</li>
              <li>• Si el elemento no tiene número de inventario, desmarque la casilla correspondiente</li>
              <li>• Para elementos con estado desconocido, seleccione "Estado Desconocido"</li>
              <li>• Al enviar el formulario se generará automáticamente un reporte imprimible</li>
              <li>• El reporte incluye un número único de identificación para seguimiento</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
