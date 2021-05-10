<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

abstract class AbstractApiController extends AbstractController
{
		public $apiKey = "";

		protected $statusCode = 200;

		protected $serializer;

		public function __construct(SerializerInterface $serializer)
		{
			$this->serializer = $serializer;
		}

		public function getStatutsCode() : int
		{
			return $this->statusCode;
		}

		public function setStatusCode($statusCode): AbstractApiController
		{
			$this->statusCode = $statusCode;

			return $this;
		}

		public function serializeData($data) : string
		{
			return $this->serializer->serialize($data, "json");
		}

		public function deserializeData(string $data, string $classname)
		{
			return $this->serializer->deserialize($data, $classname, "json");
		}

		public function respond($data): Response
		{
			return new Response($this->serializeData($data),$this->getStatutsCode(), ["Content-Type" => "application/json", "Access-Control-Allow-Origin" => "*"]);
		}

		public function respondWithErrors($errors): Response
		{
			return $this->respond([
				'code' => $this->getStatutsCode(),
				'error' => $errors
			]);
		}

		public function respondCreated($message): Response
		{
			return $this->setStatusCode(Response::HTTP_CREATED)->respond(["code" => Response::HTTP_CREATED, "message" => $message]);
		}

		public function respondDeleted($message) : Response
		{
			return $this->setStatusCode(Response::HTTP_NO_CONTENT)->respond(["code" => Response::HTTP_NO_CONTENT, "message" => $message]);
		}

		public function respondNotFound($message) : Response
		{
			return $this->setStatusCode(Response::HTTP_NOT_FOUND)->respondWithErrors(["code" => Response::HTTP_NOT_FOUND, "message" => $message]);
		}
}