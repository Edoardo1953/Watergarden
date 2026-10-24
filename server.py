import os
import sys
import json
import http.server
import socketserver
import webbrowser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.join(BASE_DIR, "uploads", "Documenti")
os.makedirs(DOCS_DIR, exist_ok=True)
PORT = 8089

class WatergardenHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Allow media buffering for video/images/pdf, no-cache for code
        if any(self.path.lower().endswith(ext) for ext in ['.mp4', '.mpg4', '.mov', '.webm', '.jpg', '.jpeg', '.png', '.webp', '.pdf']):
            self.send_header('Accept-Ranges', 'bytes')
            self.send_header('Cache-Control', 'public, max-age=3600')
        else:
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()

        range_header = self.headers.get('Range')
        if not range_header or not range_header.startswith('bytes='):
            return super().send_head()

        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        total_size = fs.st_size

        try:
            ranges = range_header[6:].split('-')
            start = int(ranges[0]) if ranges[0] else 0
            end = int(ranges[1]) if ranges[1] else total_size - 1
            if start >= total_size or end >= total_size or start > end:
                self.send_error(416, "Requested Range Not Satisfiable")
                f.close()
                return None

            length = end - start + 1
            self.send_response(206)
            ctype = self.guess_type(path)
            self.send_header('Content-Type', ctype)
            self.send_header('Content-Range', f'bytes {start}-{end}/{total_size}')
            self.send_header('Content-Length', str(length))
            self.end_headers()

            f.seek(start)

            class RangeReader:
                def __init__(self, file_obj, bytes_to_read):
                    self.f = file_obj
                    self.remaining = bytes_to_read
                def read(self, size=-1):
                    if self.remaining <= 0:
                        return b""
                    chunk = size if (size > 0 and size < self.remaining) else self.remaining
                    data = self.f.read(chunk)
                    self.remaining -= len(data)
                    return data
                def close(self):
                    self.f.close()

            return RangeReader(f, length)
        except Exception:
            f.close()
            return super().send_head()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/save-record'):
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                new_record = json.loads(body.decode('utf-8'))
                
                # Append to data.js or custom log
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "record": new_record}).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
                return

        super().do_POST()

def is_port_in_use(port):
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def open_app_url(url):
    try:
        if webbrowser.open(url):
            return
    except Exception:
        pass
    try:
        if sys.platform == 'win32':
            os.system(f'start "" "{url}"')
    except Exception:
        pass

def run_server():
    url = f"http://localhost:{PORT}/index.html"

    # Se il server è già attivo, apri direttamente il browser ed esci
    if is_port_in_use(PORT):
        print(f"============================================================")
        print(f"  Watergarden Server deja actif sur le port {PORT}")
        print(f"  Ouverture de l'application : {url}")
        print(f"============================================================")
        open_app_url(url)
        return

    http.server.ThreadingHTTPServer.allow_reuse_address = True
    try:
        with http.server.ThreadingHTTPServer(("", PORT), WatergardenHandler) as httpd:
            print(f"============================================================")
            print(f"  Watergarden Management Sarl - Serveur Web Local Actif")
            print(f"  URL : {url}")
            print(f"  Holding de Participations - Luxembourg")
            print(f"============================================================")
            open_app_url(url)
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\nArret du serveur Watergarden.")
                sys.exit(0)
    except OSError as e:
        print(f"Port {PORT} occupe ({e}). Ouverture du navigateur...")
        open_app_url(url)

if __name__ == '__main__':
    run_server()
