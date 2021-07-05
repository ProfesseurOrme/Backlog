<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializerInterface as JMS;
use Symfony\Component\Serializer\SerializerInterface as SFSerializer;


abstract class AbstractApiController extends AbstractController
{
		private $statusCode = 200;

		protected $serializer;
		protected $sfSerializer;

		public function __construct(JMS $serializer, SFSerializer $sfSerializer)
		{
			$this->serializer = $serializer;
			$this->sfSerializer = $sfSerializer;
		}

		private function getStatusCode() : int
		{
			return $this->statusCode;
		}

		private function setStatusCode($statusCode): AbstractApiController
		{
			$this->statusCode = $statusCode;

			return $this;
		}

		public function serializeData($data, $groups = null) : string
		{
			return $this->serializer->serialize($data, "json", $groups);
		}

		public function deserializeData(string $data, string $classname)
		{
			return $this->sfSerializer->deserialize($data, $classname, "json");
		}

		public function respond($data, $groups = null): Response
		{
			return new Response($this->serializeData($data, $groups),$this->getStatusCode(), ["Content-Type" => "application/json",
				"Access-Control-Allow-Origin" => "*"]);
		}

		public function respondWithErrors($errors): Response
		{
			return $this->respond([
				'code' => $this->getStatusCode(),
				'error' => $errors
			]);
		}

		public function respondWithCode($code, $message) : Response
		{
			return $this->setStatusCode($code)->respond(["code" => $code, "message" => $message]);
		}

		public function respondCreated($message): Response
		{
			return $this->setStatusCode(Response::HTTP_CREATED)->respond(["code" => Response::HTTP_CREATED, "message" => $message]);
		}

		public function respondDeleted() : Response
		{
			return $this->setStatusCode(Response::HTTP_NO_CONTENT)->respond(["code" => Response::HTTP_NO_CONTENT]);
		}

		public function respondUpdated($message) : Response
		{
			return $this->setStatusCode(Response::HTTP_OK)->respond(["code" => Response::HTTP_OK, "message" => $message]);
		}

		public function respondNotFound($message) : Response
		{
			return $this->setStatusCode(Response::HTTP_NOT_FOUND)->respond(["code" => Response::HTTP_NOT_FOUND, "message" => $message]);
		}
}